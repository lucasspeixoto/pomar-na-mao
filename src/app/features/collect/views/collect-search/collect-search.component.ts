import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { CollectSearchFiltersComponent } from '../../components/collect-search/collect-search-filters/collect-search-filters.component';
import { CollectSearchMapComponent } from '../../components/collect-search/collect-search-map/collect-search-map.component';
import { CollectSearchItemsComponent } from '../../components/collect-search/collect-search-items/collect-search-items.component';

const COMPONENTS = [
  CollectSearchFiltersComponent,
  CollectSearchMapComponent,
  CollectSearchItemsComponent,
];

const COMMON = [NgStyle];

@Component({
  selector: 'app-collect-search',
  imports: [...COMPONENTS, ...COMMON],
  templateUrl: './collect-search.component.html',
})
export class CollectSearchComponent {
  constructor() {
    setTimeout(() => {
      document.getElementById('mapRef')?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    }, 500);
  }
}
