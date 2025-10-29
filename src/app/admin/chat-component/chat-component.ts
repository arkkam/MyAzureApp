import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss'],
})
export class ChatComponent implements AfterViewChecked {
  private http = inject(HttpClient);

  messages = signal<{ sender: string; text: string }[]>([
    { sender: 'Bot', text: 'Hello! How can I help you today?' },
  ]);

  userPrompt = signal('');
  loading = signal(false);

  @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  async sendMessage() {
    const prompt = this.userPrompt().trim();
    if (!prompt || this.loading()) return;

    this.messages.update((msgs) => [...msgs, { sender: 'User', text: prompt }]);
    this.userPrompt.set('');
    this.loading.set(true);

    try {
      const response: any = await this.http
        .post(`${environment.apiUrl}api/chat/ask`, { prompt })
        .toPromise();

      this.messages.update((msgs) => [
        ...msgs,
        { sender: 'Bot', text: response.response },
      ]);
    } catch {
      this.messages.update((msgs) => [
        ...msgs,
        { sender: 'Bot', text: '⚠️ Error: unable to connect to server.' },
      ]);
    } finally {
      this.loading.set(false);
      this.scrollToBottom();
    }
  }

  onEnterPress(event: any) {
    if (event.shiftKey) return; // allow Shift+Enter for newline
    event.preventDefault();
    if (!this.loading()) {
      this.sendMessage();
    }
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.userPrompt.set(value);
    this.autoResize();
  }

  private autoResize() {
    const textarea = this.chatInput?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      const container = this.messagesContainer?.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch { }
  }
}
