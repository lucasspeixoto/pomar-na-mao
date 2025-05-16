import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectSearchItemsComponent } from './collect-search-items.component';
import { MessageService } from 'primeng/api';

describe('CollectSearchItemsComponent', () => {
  let component: CollectSearchItemsComponent;
  let fixture: ComponentFixture<CollectSearchItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectSearchItemsComponent],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectSearchItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
