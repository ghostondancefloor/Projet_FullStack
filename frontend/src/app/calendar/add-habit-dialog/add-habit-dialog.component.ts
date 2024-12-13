import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-add-habit-dialog',
  templateUrl: './add-habit-dialog.component.html',
  styleUrls: ['./add-habit-dialog.component.css'],
})
export class AddHabitDialogComponent {
  habitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHabitDialogComponent>,
    private habitService: HabitService
  ) {
    this.habitForm = this.fb.group({
      habit: ['', Validators.required],
      description: ['', Validators.required],
      end: [''],
      frequency: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]], // Duration in minutes
    });
    
  }

  /**
   * Handles the form submission to add a habit.
   */
  onSubmit(): void {
    if (this.habitForm.valid) {
      const habitData = this.habitForm.value;
      this.habitService.addHabit(habitData).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error adding habit:', err);
        },
      });
    }
  }
  

  /**
   * Handles cancellation of the dialog.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
