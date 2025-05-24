import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchFiltersComponent } from '@collectC/search/search-filters/search-filters.component';
import { SearchItemsComponent } from '@collectC/search/search-items/search-items.component';
import { SearchMapComponent } from '@collectC/search/search-map/search-map.component';
import { DialogModule } from 'primeng/dialog';

const PRIMENG = [ButtonModule, DialogModule];

const COMPONENTS = [SearchFiltersComponent, SearchMapComponent, SearchItemsComponent];

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
