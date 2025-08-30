/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectRoutineLoadedPlantsConfirmationComponent } from './inspect-routine-loaded-plants-confirmation';
import { MessageService } from 'primeng/api';

describe('InspectRoutineLoadedPlantsConfirmationComponent', () => {
  let component: InspectRoutineLoadedPlantsConfirmationComponent;
  let fixture: ComponentFixture<InspectRoutineLoadedPlantsConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InspectRoutineLoadedPlantsConfirmationComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectRoutineLoadedPlantsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
