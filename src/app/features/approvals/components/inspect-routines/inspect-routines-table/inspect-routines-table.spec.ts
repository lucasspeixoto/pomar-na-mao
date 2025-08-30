/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectRoutinesTableComponent } from './inspect-routines-table';
import { MessageService } from 'primeng/api';

describe('InspectRoutinesTableComponent', () => {
  let component: InspectRoutinesTableComponent;
  let fixture: ComponentFixture<InspectRoutinesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InspectRoutinesTableComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectRoutinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
