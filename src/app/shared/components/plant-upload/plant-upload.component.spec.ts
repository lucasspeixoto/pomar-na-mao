/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantUploadComponent } from './plant-upload.component';

describe('PlantUploadComponent', () => {
  let component: PlantUploadComponent;
  let fixture: ComponentFixture<PlantUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlantUploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
