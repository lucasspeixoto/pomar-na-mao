import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGeolocationWebInfos } from './device-geolocation-web-infos';

describe('DeviceGeolocationWebInfos', () => {
  let component: DeviceGeolocationWebInfos;
  let fixture: ComponentFixture<DeviceGeolocationWebInfos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceGeolocationWebInfos],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceGeolocationWebInfos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
