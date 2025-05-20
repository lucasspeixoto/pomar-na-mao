import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDialogComponent } from './observation-dialog.component';
import { MessageService } from 'primeng/api';

describe('ObservationDialogComponent', () => {
  let component: ObservationDialogComponent;
  let fixture: ComponentFixture<ObservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservationDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
