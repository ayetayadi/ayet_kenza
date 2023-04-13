import { TestBed } from '@angular/core/testing';

import { AuthMembreService } from './auth-membre.service';

describe('AuthMembreService', () => {
  let service: AuthMembreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMembreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
