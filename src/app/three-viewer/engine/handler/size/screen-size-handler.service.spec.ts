import { TestBed } from '@angular/core/testing';

import { ScreenSizeHandlerService } from './screen-size-handler.service';

describe('ScreenSizeHandlerService', () => {
  let service: ScreenSizeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeHandlerService);
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });
});
