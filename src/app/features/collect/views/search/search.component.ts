import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchFiltersDialogComponent } from '@collectC/search/search-filters-dialog/search-filters-dialog.component';
import { SearchFiltersComponent } from '@collectC/search/search-filters/search-filters.component';
import { SearchItemsComponent } from '@collectC/search/search-items/search-items.component';
import { SearchMapComponent } from '@collectC/search/search-map/search-map.component';
import { DividerModule } from 'primeng/divider';

const PRIMENG = [ButtonModule, DividerModule];

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
  public collectSearchFilterDialog = signal(false);

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
