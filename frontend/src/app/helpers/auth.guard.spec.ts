import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';
import { StorageService } from '../services/storage.service';

describe('authGuard', () => {
  let mockStorageService: Partial<StorageService>;
  let mockRouter: Partial<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockStorageService = {
      isLoggedIn: () => true, // Simulate logged-in state
    };

    mockRouter = {
      createUrlTree: jest.fn(), // Mock URL tree creation
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access if logged in', () => {
    expect(executeGuard(null as any, null as any)).toBeTruthy();
  });

  it('should redirect to login if not logged in', () => {
    mockStorageService.isLoggedIn = () => false; // Simulate not logged in
    const result = executeGuard(null as any, null as any);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
