import { TestBed } from '@angular/core/testing';

import { AuthadminInterceptor } from './authadmin.interceptor';

describe('AuthadminInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthadminInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthadminInterceptor = TestBed.inject(AuthadminInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
