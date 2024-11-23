// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // BehaviorSubject to track login status
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor() {}

  // Method to check if the user is logged in
  public isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Observable to allow components to subscribe to login status changes
  public watchLoginStatus() {
    return this.isLoggedInSubject.asObservable();
  }

  // Save user data and update login status
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isLoggedInSubject.next(true); // Emit login status change
  }

  // Retrieve user data
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Clear storage and update login status
  public clean(): void {
    window.sessionStorage.clear();
    this.isLoggedInSubject.next(false); // Emit login status change
  }
}
