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
        this.storageService.saveUser(data);
        this.isLoginFailed = false;

        // Show success popup
        this.snackBar.open(`🎉 Welcome back, ${data.username}!`, 'Close', {
          duration: 5000, // Duration in milliseconds
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        // Redirect to the calendar page !!!!!
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
