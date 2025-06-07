import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollectFilters } from './search-collect-filters';
import { MessageService } from 'primeng/api';

describe('SearchCollectFilters', () => {
  let component: SearchCollectFilters;
  let fixture: ComponentFixture<SearchCollectFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCollectFilters],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCollectFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
