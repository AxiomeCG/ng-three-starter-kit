import { TestBed } from '@angular/core/testing';

import { TimeHandlerService } from './time-handler.service';

describe('TimeHandlerService', () => {
  let service: TimeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeHandlerService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });
});
