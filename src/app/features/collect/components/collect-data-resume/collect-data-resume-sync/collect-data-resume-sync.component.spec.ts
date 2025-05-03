import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDataResumeSyncComponent } from './collect-data-resume-sync.component';
import { MessageService } from 'primeng/api';

describe('CollectDataResumeSyncComponent', () => {
  let component: CollectDataResumeSyncComponent;
  let fixture: ComponentFixture<CollectDataResumeSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectDataResumeSyncComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectDataResumeSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
