import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = environment.apiUrl;
  private baseUrl = `${this.apiUrl}api/users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}`);
  }
}
