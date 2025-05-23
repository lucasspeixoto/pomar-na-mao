/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { LayoutService } from './app/layout/services/layout.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SwUpdate } from '@angular/service-worker';
import { UpdateService } from '@sharedS/update/update.service';

// Add mock SwUpdate
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
  let layoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(() => {
    const layoutServiceMock = { startAppConfig: jasmine.createSpy('layoutServiceSpy') };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ToastModule,
        MessageService,
        UpdateService,
        provideAnimationsAsync(),
        providePrimeNG(),
        { provide: LayoutService, useValue: layoutServiceMock },
        { provide: SwUpdate, useValue: swUpdateMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
