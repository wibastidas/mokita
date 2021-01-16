import { TestBed } from '@angular/core/testing';

import { RoleBasedAutorizationService } from './role-based-autorization.service';

describe('RoleBasedAutorizationService', () => {
  let service: RoleBasedAutorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleBasedAutorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
