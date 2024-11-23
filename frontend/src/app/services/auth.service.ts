// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      credentials,
      {
        withCredentials: true, // Include cookies in the request
      }
    );
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      user,
      {
        withCredentials: true, // Include cookies in the request
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'signout',
      {},
      {
        withCredentials: true, // Include cookies in the request
      }
    );
  }
}
