import { TestBed } from '@angular/core/testing';

import { PointerService } from './pointer.service';

describe('PointerService', () => {
  let service: PointerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
