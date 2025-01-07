import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should set withCredentials to true on requests', () => {
    const httpHandler: HttpHandler = {
      handle: jest.fn(), // Mock handle function
    };

    const httpRequest = new HttpRequest('GET', '/test-url');

    interceptor.intercept(httpRequest, httpHandler);

    expect(httpHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        withCredentials: true, // Ensure withCredentials is true
      })
    );
  });
});
