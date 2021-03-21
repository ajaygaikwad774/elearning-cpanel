import { TestBed } from '@angular/core/testing';

import { AddformsService } from './addforms.service';

describe('AddformsService', () => {
  let service: AddformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
