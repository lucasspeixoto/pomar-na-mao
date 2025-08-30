import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineDetailCardComponent } from './routine-detail-card';

describe('RoutineDetailCardComponent', () => {
  let component: RoutineDetailCardComponent;
  let fixture: ComponentFixture<RoutineDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
