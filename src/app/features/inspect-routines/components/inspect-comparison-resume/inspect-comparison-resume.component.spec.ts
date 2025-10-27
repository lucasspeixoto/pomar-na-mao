/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectComparisonResumeComponent } from './inspect-comparison-resume.component';

describe('InspectComparisonResumeComponent', () => {
  let component: InspectComparisonResumeComponent;
  let fixture: ComponentFixture<InspectComparisonResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InspectComparisonResumeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectComparisonResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
