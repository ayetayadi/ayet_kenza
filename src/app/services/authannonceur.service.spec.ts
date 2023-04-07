import { TestBed } from '@angular/core/testing';

import { AuthannonceurService } from './authannonceur.service';

describe('AuthannonceurService', () => {
  let service: AuthannonceurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthannonceurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
