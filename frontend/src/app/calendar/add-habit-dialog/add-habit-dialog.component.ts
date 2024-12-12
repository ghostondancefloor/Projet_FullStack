import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-habit-dialog',
  templateUrl: './add-habit-dialog.component.html',
  styleUrls: ['./add-habit-dialog.component.css'],
})
export class AddHabitDialogComponent {
  habitForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHabitDialogComponent>
  ) {
    this.habitForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.habitForm.valid) {
      this.dialogRef.close(this.habitForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
