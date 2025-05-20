import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchFiltersDialogComponent } from '../../components/search/search-filters-dialog/search-filters-dialog.component';
import { SearchFiltersComponent } from '../../components/search/search-filters/search-filters.component';
import { SearchItemsComponent } from '../../components/search/search-items/search-items.component';
import { SearchMapComponent } from '../../components/search/search-map/search-map.component';

const PRIMENG = [ButtonModule];

const COMPONENTS = [
  SearchFiltersComponent,
  SearchMapComponent,
  SearchItemsComponent,
  SearchFiltersDialogComponent,
];

const COMMON = [NgStyle];

@Component({
  selector: 'app-search',
  imports: [...COMPONENTS, ...COMMON, ...PRIMENG],
  templateUrl: './search.component.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public collectSearchFilterDialog = false;

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
