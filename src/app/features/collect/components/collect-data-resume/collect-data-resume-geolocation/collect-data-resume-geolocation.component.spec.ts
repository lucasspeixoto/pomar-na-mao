import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDataResumeGeolocationComponent } from './collect-data-resume-geolocation.component';

describe('CollectDataResumeGeolocationComponent', () => {
  let component: CollectDataResumeGeolocationComponent;
  let fixture: ComponentFixture<CollectDataResumeGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectDataResumeGeolocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectDataResumeGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
