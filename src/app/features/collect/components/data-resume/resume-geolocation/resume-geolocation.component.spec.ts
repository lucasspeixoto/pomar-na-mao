import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGeolocationComponent } from './resume-geolocation.component';

describe('ResumeGeolocationComponent', () => {
  let component: ResumeGeolocationComponent;
  let fixture: ComponentFixture<ResumeGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGeolocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
