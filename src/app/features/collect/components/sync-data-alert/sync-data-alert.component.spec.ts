/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SyncDataAlertComponent } from './sync-data-alert.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SyncDataAlertComponent', () => {
  let component: SyncDataAlertComponent;
  let fixture: ComponentFixture<SyncDataAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SyncDataAlertComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncDataAlertComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalCollectedData', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
