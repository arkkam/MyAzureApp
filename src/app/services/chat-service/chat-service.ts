import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  private baseUrl = `${this.apiUrl}api/chat/ask`;
  //private apiUrl = 'https://localhost:5001/api/chat/ask';

  async sendPrompt(prompt: string): Promise<string> {
    const response = await axios.post(this.baseUrl, { prompt });
    return response.data.response;
  }
}
