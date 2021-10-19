import { TestBed } from '@angular/core/testing';

import { ToppingService } from './topping.service';

describe('ToppingService', () => {
  let service: ToppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
