import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHabitDialogComponent } from './add-habit-dialog.component';

describe('AddHabitDialogComponent', () => {
  let component: AddHabitDialogComponent;
  let fixture: ComponentFixture<AddHabitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHabitDialogComponent]
    });
    fixture = TestBed.createComponent(AddHabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
