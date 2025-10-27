/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinePlantComparisonComponent } from './routine-plant-comparison.component';

describe('RoutinePlantComparisonComponent', () => {
  let component: RoutinePlantComparisonComponent;
  let fixture: ComponentFixture<RoutinePlantComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutinePlantComparisonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutinePlantComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
