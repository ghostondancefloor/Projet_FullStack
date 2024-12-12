import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null,
  };
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login({ username, password }).subscribe({
      next: (data) => {
        // Save the user data to sessionStorage
        this.storageService.saveUser(data);

        // Display success message
        this.snackBar.open(`🎉 Welcome back, ${data.username}!`, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        // Redirect to the calendar page
        this.router.navigate(['/calendar']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred during login.';
        this.isLoginFailed = true;
        console.error('Login Error:', err); // Debugging log
      },
    });
  }
}
