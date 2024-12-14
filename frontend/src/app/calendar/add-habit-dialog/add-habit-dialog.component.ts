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
  
  // Define days of the week
  daysOfWeek = [
    { key: 'one', label: 'Monday' },
    { key: 'two', label: 'Tuesday' },
    { key: 'three', label: 'Wednesday' },
    { key: 'four', label: 'Thursday' },
    { key: 'five', label: 'Friday' },
    { key: 'six', label: 'Saturday' },
    { key: 'seven', label: 'Sunday' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHabitDialogComponent>,
    private habitService: HabitService
  ) {
    this.habitForm = this.fb.group({
      habit: ['', Validators.required],
      description: ['', Validators.required],
      frequency: ['', Validators.required],
      days: this.fb.group({
        one: [false], // Default unchecked
        two: [false],
        three: [false],
        four: [false],
        five: [false],
        six: [false],
        seven: [false],
      }),
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]], // Duration in minutes
      end: [''],
    });
  }

  onSubmit(): void {
    if (this.habitForm.valid) {
      const formValue = this.habitForm.value;
      const days = formValue.days || {};
      const processedDays = {
        one: days.one || false,
        two: days.two || false,
        three: days.three || false,
        four: days.four || false,
        five: days.five || false,
        six: days.six || false,
        seven: days.seven || false,
      };
  
      const habitData = {
        ...formValue,
        days: processedDays,
      };
  
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
  
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
