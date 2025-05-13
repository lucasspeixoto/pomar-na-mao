import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

const PRIMENG = [DataViewModule];

@Component({
  selector: 'app-collect-search-items',
  imports: [...PRIMENG],
  templateUrl: './collect-search-items.component.html',
  styleUrl: './collect-search-items.component.scss',
})
export class CollectSearchItemsComponent {}
