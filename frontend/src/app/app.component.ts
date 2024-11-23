// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to login status changes
    this.storageService.watchLoginStatus().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.username = user.username;
      } else {
        this.username = undefined;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean(); // Clears storage and updates login status
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
