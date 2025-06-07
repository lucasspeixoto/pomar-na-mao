/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Connectivity } from './connectivity.component';

describe('Connectivity', () => {
  let component: Connectivity;
  let fixture: ComponentFixture<Connectivity>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Connectivity],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Connectivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
