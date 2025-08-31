/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMapDetailComponent } from './routine-map-detail';
import { MessageService } from 'primeng/api';

describe('RoutineMapDetailComponent', () => {
  let component: RoutineMapDetailComponent;
  let fixture: ComponentFixture<RoutineMapDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutineMapDetailComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
