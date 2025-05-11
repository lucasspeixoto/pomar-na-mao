/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffilineLoginButtonComponent } from './offline-login-button.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

describe('OffilineLoginButtonComponent', () => {
  let component: OffilineLoginButtonComponent;
  let fixture: ComponentFixture<OffilineLoginButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OffilineLoginButtonComponent],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffilineLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
