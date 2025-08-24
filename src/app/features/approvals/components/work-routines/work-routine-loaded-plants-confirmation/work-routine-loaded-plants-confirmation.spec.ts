/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRoutineLoadedPlantsConfirmationComponent } from './work-routine-loaded-plants-confirmation';
import { MessageService } from 'primeng/api';

describe('WorkRoutineLoadedPlantsConfirmationComponent', () => {
  let component: WorkRoutineLoadedPlantsConfirmationComponent;
  let fixture: ComponentFixture<WorkRoutineLoadedPlantsConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkRoutineLoadedPlantsConfirmationComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRoutineLoadedPlantsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
