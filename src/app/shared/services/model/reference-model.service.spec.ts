import { TestBed } from '@angular/core/testing';

import { ReferenceModelService } from './reference-model.service';

describe('ReferenceModelService', () => {
  let service: ReferenceModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
