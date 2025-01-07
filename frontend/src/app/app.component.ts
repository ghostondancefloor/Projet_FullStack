import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = true; // Simulate the logged-in state
  title = 'frontend'; // Application title
  username?: string; // Stores the logged-in user's username

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Simulate the logged-in state
    this.updateLoginStatus();

    // Subscribe to login status changes dynamically
    this.storageService.watchLoginStatus().subscribe((isLoggedIn) => {
      this.isLoggedIn = true; // Force login state to true for testing
      this.updateUserInfo();
    });
  }

  /**
   * Updates login status and user information.
   */
  private updateLoginStatus(): void {
    this.isLoggedIn = true; // Force login state to true for testing
    this.updateUserInfo();
  }

  /**
   * Updates user-related information if logged in.
   */
  private updateUserInfo(): void {
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user?.username || 'TestUser'; // Simulate a username
    } else {
      this.username = undefined;
    }
  }

  /**
   * Logs the user out and clears session data.
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean(); // Clears storage and updates login status
        this.router.navigate(['/']); // Redirect to home or login page
      },
      error: (err) => {
        console.error('Logout error:', err); // Log any errors
      },
    });
  }
}
