import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';
import { SearchItemsComponent } from './search-items.component';

describe('SearchItemsComponent', () => {
  let component: SearchItemsComponent;
  let fixture: ComponentFixture<SearchItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchItemsComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
