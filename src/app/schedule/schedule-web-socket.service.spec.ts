import { TestBed } from '@angular/core/testing';

import { ScheduleWebSocketService } from './schedule-web-socket.service';

describe('ScheduleWebSocketService', () => {
  let service: ScheduleWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
