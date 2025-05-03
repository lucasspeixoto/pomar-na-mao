import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDataResumeWifiComponent } from './collect-data-resume-wifi.component';

describe('CollectDataResumeWifiComponent', () => {
  let component: CollectDataResumeWifiComponent;
  let fixture: ComponentFixture<CollectDataResumeWifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectDataResumeWifiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectDataResumeWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
