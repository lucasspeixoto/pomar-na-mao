/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsStepperComponent } from './plants-stepper';

describe('PlantsStepperComponent', () => {
  let component: PlantsStepperComponent;
  let fixture: ComponentFixture<PlantsStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantsStepperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
