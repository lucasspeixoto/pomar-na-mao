/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SwUpdate } from '@angular/service-worker';
import { LayoutConfig } from './app/core/layout/layout-config';

const swUpdateMock = {
  available: {
    subscribe: () => {},
  },
  activated: {
    subscribe: () => {},
  },
  checkForUpdate: () => Promise.resolve(),
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let layoutService: jasmine.SpyObj<LayoutConfig>;

  beforeEach(() => {
    const layoutServiceMock = { startAppConfig: jasmine.createSpy('layoutServiceSpy') };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ToastModule,
        MessageService,
        provideAnimationsAsync(),
        providePrimeNG(),
        { provide: LayoutConfig, useValue: layoutServiceMock },
        { provide: SwUpdate, useValue: swUpdateMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    layoutService = TestBed.inject(LayoutConfig) as jasmine.SpyObj<LayoutConfig>;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
