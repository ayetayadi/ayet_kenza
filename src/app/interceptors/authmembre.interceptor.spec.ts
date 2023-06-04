import { TestBed } from '@angular/core/testing';

import { AuthmembreInterceptor } from './authmembre.interceptor';

describe('AuthmembreInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthmembreInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthmembreInterceptor = TestBed.inject(AuthmembreInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
