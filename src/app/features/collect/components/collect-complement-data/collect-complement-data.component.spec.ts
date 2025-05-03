import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectComplementDataComponent } from './collect-complement-data.component';
import { MessageService } from 'primeng/api';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CollectComplementDataComponent', () => {
  let component: CollectComplementDataComponent;
  let fixture: ComponentFixture<CollectComplementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectComplementDataComponent],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectComplementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
