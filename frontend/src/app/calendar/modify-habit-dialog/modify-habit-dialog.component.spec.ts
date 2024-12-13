import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHabitDialogComponent } from './modify-habit-dialog.component';

describe('ModifyHabitDialogComponent', () => {
  let component: ModifyHabitDialogComponent;
  let fixture: ComponentFixture<ModifyHabitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyHabitDialogComponent]
    });
    fixture = TestBed.createComponent(ModifyHabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
