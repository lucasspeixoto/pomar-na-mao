import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDataComponent } from './observation-form';
import { MessageService } from 'primeng/api';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ObservationDataComponent', () => {
  let component: ObservationDataComponent;
  let fixture: ComponentFixture<ObservationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationDataComponent],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
