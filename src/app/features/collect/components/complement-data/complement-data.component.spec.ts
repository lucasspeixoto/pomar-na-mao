import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementDataComponent } from './complement-data.component';
import { MessageService } from 'primeng/api';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ComplementDataComponent', () => {
  let component: ComplementDataComponent;
  let fixture: ComponentFixture<ComplementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementDataComponent],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
