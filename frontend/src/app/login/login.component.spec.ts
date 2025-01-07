import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: {} }, // Mock AuthService
        { provide: StorageService, useValue: { saveUser: jest.fn() } }, // Mock StorageService
        { provide: Router, useValue: { navigate: jest.fn() } }, // Mock Router
        { provide: MatSnackBar, useValue: { open: jest.fn() } }, // Mock MatSnackBar
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save user and navigate on successful login simulation', () => {
    const router = TestBed.inject(Router);
    const storageService = TestBed.inject(StorageService);
    const snackBar = TestBed.inject(MatSnackBar);

    component.form = { username: 'testuser', password: 'password' };
    component.onSubmit();

    expect(storageService.saveUser).toHaveBeenCalledWith({
      username: 'testuser',
      token: 'fake-jwt-token',
    });
    expect(snackBar.open).toHaveBeenCalledWith(
      '🎉 Welcome back, testuser!',
      'Close',
      { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
    expect(router.navigate).toHaveBeenCalledWith(['/calendar']);
  });
});
