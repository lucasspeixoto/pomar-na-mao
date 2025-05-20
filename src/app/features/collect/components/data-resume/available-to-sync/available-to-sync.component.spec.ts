import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableToSyncComponent } from './available-to-sync.component';
import { MessageService } from 'primeng/api';

describe('AvailableToSyncComponent', () => {
  let component: AvailableToSyncComponent;
  let fixture: ComponentFixture<AvailableToSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableToSyncComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableToSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
