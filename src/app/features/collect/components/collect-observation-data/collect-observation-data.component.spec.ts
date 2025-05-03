import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectObservationDataComponent } from './collect-observation-data.component';
import { MessageService } from 'primeng/api';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CollectObservationDataComponent', () => {
  let component: CollectObservationDataComponent;
  let fixture: ComponentFixture<CollectObservationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectObservationDataComponent],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectObservationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
