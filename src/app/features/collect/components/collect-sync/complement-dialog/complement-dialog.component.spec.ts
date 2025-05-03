import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementDialogComponent } from './complement-dialog.component';
import { MessageService } from 'primeng/api';

describe('ComplementDialogComponent', () => {
  let component: ComplementDialogComponent;
  let fixture: ComponentFixture<ComplementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
