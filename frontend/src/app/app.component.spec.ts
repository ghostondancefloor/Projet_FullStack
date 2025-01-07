import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockStorageService: Partial<StorageService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(() => {
    mockStorageService = {
      isLoggedIn: () => true, // Simulate always logged in
      getUser: () => ({ username: 'TestUser' }), // Simulate a user
      watchLoginStatus: () => of(true), // Observable emitting true
      clean: jest.fn(), // Mock clean function
    };

    mockAuthService = {
      logout: jest.fn().mockReturnValue(of({})), // Mock logout returning observable
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should update login status on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();
    expect(app.isLoggedIn).toBeTrue();
    expect(app.username).toEqual('TestUser');
  });

  it('should call storageService.clean and navigate on logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const storageService = TestBed.inject(StorageService);
    const router = TestBed.inject(RouterTestingModule);

    jest.spyOn(router, 'navigate');
    app.logout();

    expect(storageService.clean).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
