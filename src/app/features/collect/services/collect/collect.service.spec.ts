/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed } from '@angular/core/testing';

import { CollectService } from './collect.service';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { IndexDbCollectService } from 'src/app/shared/services/index-db/index-db-collect.service';

describe('CollectService', () => {
  let service: CollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
        CollectService,
        IndexDbCollectService,
      ],
    });
    service = TestBed.inject(CollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
