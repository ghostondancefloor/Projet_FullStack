import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service'; // Import StorageService

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private apiUrl = 'http://localhost:3000/api/habits';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  // Fetch all habits for the logged-in user
  getHabitsForUser(): Observable<any[]> {
    const user = this.storageService.getUser();
    const token = user?.accessToken; // Retrieve token from sessionStorage
  
    if (!token) {
      console.error('No token found for Authorization'); // Debug log
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers });
  }
  

  // Add a new habit
  addHabit(habit: { title: string; startDate: string; endDate: string; description: string }): Observable<any> {
    const user = this.storageService.getUser();
    const token = user?.accessToken; // Retrieve token from sessionStorage

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.apiUrl, habit, { headers });
  }
}
