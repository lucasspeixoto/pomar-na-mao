/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineMainInfoComponent } from './routine-main-info.component';
import { DatePipe } from '@angular/common';

describe('RoutineMainInfoComponent', () => {
  let component: RoutineMainInfoComponent;
  let fixture: ComponentFixture<RoutineMainInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoutineMainInfoComponent, DatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineMainInfoComponent);
    component = fixture.componentInstance;
    component.routineDetail = {
      userName: 'Lucas Peixoto Fernandes',
      region: 'Z',
      date: '2025-10-22T19:47:07.621+00:00',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
