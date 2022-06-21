import { TestBed } from '@angular/core/testing';

import { PhraseModelService } from './phrase-model.service';

describe('PhraseModelService', () => {
  let service: PhraseModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhraseModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
