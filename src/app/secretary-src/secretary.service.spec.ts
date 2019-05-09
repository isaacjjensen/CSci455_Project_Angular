import { TestBed } from '@angular/core/testing';

import { SecretaryService } from './secretary.service';

describe('SecretaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretaryService = TestBed.get(SecretaryService);
    expect(service).toBeTruthy();
  });
});
