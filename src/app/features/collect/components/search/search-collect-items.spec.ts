import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';
import { SearchCollectItems } from './search-collect-items';

describe('SearchCollectItems', () => {
  let component: SearchCollectItems;
  let fixture: ComponentFixture<SearchCollectItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCollectItems],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCollectItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
