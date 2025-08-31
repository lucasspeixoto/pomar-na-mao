/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantOccurrencesComponent } from './plant-occurrences';

describe('PlantOccurrencesComponent', () => {
  let component: PlantOccurrencesComponent;
  let fixture: ComponentFixture<PlantOccurrencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlantOccurrencesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantOccurrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
