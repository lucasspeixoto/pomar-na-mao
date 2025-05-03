import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineCollectComponent } from './offline-collect.component';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';

describe('OfflineCollectComponent', () => {
  let component: OfflineCollectComponent;
  let fixture: ComponentFixture<OfflineCollectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OfflineCollectComponent],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock route parameters
            queryParams: of({}), // Mock query parameters
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            snapshot: { paramMap: { get: (key: string): string => '123' } }, // Mock snapshot
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfflineCollectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
