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
  isLoginFailed = false; // Remplacer par false pour désactiver l'affichage d'erreur
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const { username, password } = this.form;

    // Simuler une connexion réussie
    const fakeData = {
      username: username || 'TestUser', // Simuler un utilisateur
      token: 'fake-jwt-token', // Simuler un token
    };

    // Sauvegarder les données utilisateur simulées
    this.storageService.saveUser(fakeData);

    // Afficher un message de succès
    this.snackBar.open(`🎉 Welcome back, ${fakeData.username}!`, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    // Rediriger vers la page de calendrier
    this.router.navigate(['/calendar']);
  }
}
