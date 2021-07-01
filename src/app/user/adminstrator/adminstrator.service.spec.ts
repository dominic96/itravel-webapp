import { TestBed } from '@angular/core/testing';

import { AdminstratorService } from './adminstrator.service';

describe('AdminstratorService', () => {
  let service: AdminstratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
