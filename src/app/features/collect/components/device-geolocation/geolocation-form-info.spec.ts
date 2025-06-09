import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocationFormInfo } from './geolocation-form-info';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('GeolocationFormInfo', () => {
  let component: GeolocationFormInfo;
  let fixture: ComponentFixture<GeolocationFormInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeolocationFormInfo],
      providers: [provideAnimationsAsync(), provideAnimations(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(GeolocationFormInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
