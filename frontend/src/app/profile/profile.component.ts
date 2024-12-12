import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: any = {}; // Store user profile data
  habits: any[] = []; // Store list of habits
  isLoading: boolean = true; // Track loading state
  errorMessage: string | null = null; // Track error message

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true; // Start loading
    this.userService.getProfile().subscribe({
      next: (data) => {
        console.log('Profile data received:', data); // Debug: Log the data
  
        this.userProfile = { username: data.username, email: data.email };
        this.habits = data.habits;
        this.isLoading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error loading profile:', err); // Debug: Log the error
        this.errorMessage = 'Failed to load profile. Please try again later.';
        this.isLoading = false; // Stop loading
      },
    });
  }
  
  
}
