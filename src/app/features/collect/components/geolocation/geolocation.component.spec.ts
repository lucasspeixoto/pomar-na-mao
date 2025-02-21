/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationComponent } from './geolocation.component';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';

describe('GeolocationComponent', () => {
  let component: GeolocationComponent;
  let fixture: ComponentFixture<GeolocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeolocationComponent],
      providers: [GeolocationService],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
