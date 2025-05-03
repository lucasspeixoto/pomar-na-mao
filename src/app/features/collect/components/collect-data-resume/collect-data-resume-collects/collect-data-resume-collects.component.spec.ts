import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDataResumeCollectsComponent } from './collect-data-resume-collects.component';
import { MessageService } from 'primeng/api';

describe('CollectDataResumeCollectsComponent', () => {
  let component: CollectDataResumeCollectsComponent;
  let fixture: ComponentFixture<CollectDataResumeCollectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectDataResumeCollectsComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectDataResumeCollectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
