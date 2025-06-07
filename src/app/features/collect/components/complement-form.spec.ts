import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementForm } from './complement-form';
import { MessageService } from 'primeng/api';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ComplementForm', () => {
  let component: ComplementForm;
  let fixture: ComponentFixture<ComplementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementForm],
      providers: [
        provideAnimationsAsync(),
        provideAnimations(),
        provideNoopAnimations(),
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
