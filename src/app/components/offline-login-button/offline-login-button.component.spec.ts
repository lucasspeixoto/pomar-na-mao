/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineLoginButtonComponent } from './offline-login-button.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

describe('OfflineLoginButtonComponent', () => {
  let component: OfflineLoginButtonComponent;
  let fixture: ComponentFixture<OfflineLoginButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OfflineLoginButtonComponent],
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
    fixture = TestBed.createComponent(OfflineLoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
