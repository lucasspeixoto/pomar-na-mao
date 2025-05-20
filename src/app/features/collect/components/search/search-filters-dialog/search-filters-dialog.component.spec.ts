import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersDialogComponent } from './search-filters-dialog.component';
import { MessageService } from 'primeng/api';

describe('SearchFiltersDialogComponent', () => {
  let component: SearchFiltersDialogComponent;
  let fixture: ComponentFixture<SearchFiltersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersDialogComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
