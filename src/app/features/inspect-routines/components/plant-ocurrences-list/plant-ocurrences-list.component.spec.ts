import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantOcurrencesListComponent } from './plant-ocurrences-list.component';

describe('PlantOcurrencesListComponent', () => {
  let component: PlantOcurrencesListComponent;
  let fixture: ComponentFixture<PlantOcurrencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantOcurrencesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantOcurrencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
