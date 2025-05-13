import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSearchFiltersDialogComponent } from './collect-search-filters-dialog.component';
import { MessageService } from 'primeng/api';

describe('CollectSearchFiltersDialogComponent', () => {
  let component: CollectSearchFiltersDialogComponent;
  let fixture: ComponentFixture<CollectSearchFiltersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectSearchFiltersDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectSearchFiltersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
