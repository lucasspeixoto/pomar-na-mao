import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectSearchFiltersComponent } from './collect-search-filters.component';
import { MessageService } from 'primeng/api';

describe('CollectSearchFiltersComponent', () => {
  let component: CollectSearchFiltersComponent;
  let fixture: ComponentFixture<CollectSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectSearchFiltersComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
