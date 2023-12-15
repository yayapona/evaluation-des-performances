import { TestBed } from '@angular/core/testing';

import { SousDirectionService } from './sous-direction.service';

describe('SousDirectionService', () => {
  let service: SousDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
