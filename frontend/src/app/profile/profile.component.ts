import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyHabitDialogComponent } from '../calendar/modify-habit-dialog/modify-habit-dialog.component';
import { HabitService } from '../services/habit.service';
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

  constructor(
    private userService: UserService,
    private habitService: HabitService, // Inject HabitService
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // Load user profile and habits
  loadProfile(): void {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.userProfile = { username: data.username, email: data.email }; // User details
        this.habits = data.habits; // User habits
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = 'Failed to load profile. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  // Delete a habit
  deleteHabit(habitId: string): void {
    if (confirm('Are you sure you want to delete this habit?')) {
      this.habitService.deleteHabit(habitId).subscribe({
        next: () => {
          alert('Habit deleted successfully!');
          this.loadProfile(); // Reload the profile after deletion
        },
        error: (err) => {
          console.error('Error deleting habit:', err);
        },
      });
    }
  }

  // Modify a habit
  modifyHabit(habit: any): void {
    const dialogRef = this.dialog.open(ModifyHabitDialogComponent, {
      width: '400px',
      data: habit // Pass the selected habit data to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfile(); // Reload profile after successful modification
      }
    });
  }
}
