/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UpdateService } from './shared/services/update/update.service';
import { SwUpdate } from '@angular/service-worker';

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        UpdateService,
        { provide: SwUpdate, useValue: swUpdateMock }, // Replace SwUpdate with mock
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
