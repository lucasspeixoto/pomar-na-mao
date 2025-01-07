import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionModeComponent } from './action-mode.component';

describe('ActionModeComponent', () => {
  let component: ActionModeComponent;
  let fixture: ComponentFixture<ActionModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
