import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-modify-habit-dialog',
  templateUrl: './modify-habit-dialog.component.html',
  styleUrls: ['./modify-habit-dialog.component.css']
})
export class ModifyHabitDialogComponent {
  habitForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModifyHabitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Receive the habit data
    private fb: FormBuilder,
    private habitService: HabitService
  ) {
    this.habitForm = this.fb.group({
      habit: [data.habit, Validators.required],
      description: [data.description, Validators.required],
      date: [data.date, Validators.required],
      time: [data.time, Validators.required],
      duration: [data.duration, [Validators.required, Validators.min(1)]],
    });
  }

  // Submit updated habit
  onSubmit(): void {
    if (this.habitForm.valid) {
      const updatedHabit = this.habitForm.value;
      this.habitService.updateHabit(this.data._id, updatedHabit).subscribe({
        next: () => {
          alert('Habit updated successfully!');
          this.dialogRef.close(true); // Pass a success flag back
        },
        error: (err) => {
          console.error('Error updating habit:', err);
        }
      });
    }
  }

  // Cancel modification
  onCancel(): void {
    this.dialogRef.close(false); // Pass a cancel flag back
  }
}
