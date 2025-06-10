import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceGeolocationMobileInfos } from './device-geolocation-mobile-infos';

describe('DeviceGeolocationMobileInfos', () => {
  let component: DeviceGeolocationMobileInfos;
  let fixture: ComponentFixture<DeviceGeolocationMobileInfos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceGeolocationMobileInfos],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceGeolocationMobileInfos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
