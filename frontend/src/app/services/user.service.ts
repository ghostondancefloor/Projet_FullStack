import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getProfile(): Observable<any> {
    const user = this.storageService.getUser();
    const token = user?.accessToken;
  
    if (!token) {
      console.error('No token found');
      return throwError(() => new Error('No token available for authorization'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
  
}
