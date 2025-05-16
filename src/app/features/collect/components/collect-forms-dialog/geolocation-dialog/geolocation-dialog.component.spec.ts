import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationDialogComponent } from './geolocation-dialog.component';
import { MessageService } from 'primeng/api';

describe('GeolocationDialogComponent', () => {
  let component: GeolocationDialogComponent;
  let fixture: ComponentFixture<GeolocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeolocationDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
