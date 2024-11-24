import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register({ username, email, password }).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        // Show success popup
        this.snackBar.open(`🎉 Welcome, ${username}! Registration successful!`, 'Close', {
          duration: 5000, // Duration in milliseconds
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        // Redirect to home
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
}
