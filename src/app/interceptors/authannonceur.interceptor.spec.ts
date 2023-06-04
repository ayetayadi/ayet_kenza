import { TestBed } from '@angular/core/testing';

import { AuthannonceurInterceptor } from './authannonceur.interceptor';

describe('AuthannonceurInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthannonceurInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthannonceurInterceptor = TestBed.inject(AuthannonceurInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
