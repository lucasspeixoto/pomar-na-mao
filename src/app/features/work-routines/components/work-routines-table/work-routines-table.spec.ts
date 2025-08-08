/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRoutinesTableComponent } from './work-routines-table';
import { MessageService } from 'primeng/api';

describe('WorkRoutinesTableComponent', () => {
  let component: WorkRoutinesTableComponent;
  let fixture: ComponentFixture<WorkRoutinesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkRoutinesTableComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRoutinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
