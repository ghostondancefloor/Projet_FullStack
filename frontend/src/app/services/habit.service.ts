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

  // Helper method to get headers with Authorization token
  private getHeaders(): HttpHeaders {
    const user = this.storageService.getUser();
    const token = user?.accessToken;

    if (!token) {
      console.error('No token found for Authorization');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all habits for the logged-in user
  getHabitsForUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers: this.getHeaders() });
  }

  // Fetch events for the calendar
  getHabitEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`, { headers: this.getHeaders() });
  }

  // Add a new habit
  addHabit(habit: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, habit, { headers: this.getHeaders() });
  }
  updateHabit(habitId: string, updatedHabit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${habitId}`, updatedHabit, {
      headers: this.getHeaders(),
    });
  }
  // Delete a habit by ID
  deleteHabit(habitId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${habitId}`, { headers: this.getHeaders() });
  }
}
