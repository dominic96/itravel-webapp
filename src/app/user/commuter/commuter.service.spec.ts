import { TestBed } from '@angular/core/testing';

import { CommuterService } from './commuter.service';

describe('CommuterService', () => {
  let service: CommuterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
