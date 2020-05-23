import { TestBed, inject } from '@angular/core/testing';

import { PangolinService } from './pangolin.service';

describe('PangolinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PangolinService]
    });
  });

  it('should be created', inject([PangolinService], (service: PangolinService) => {
    expect(service).toBeTruthy();
  }));
});
