import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchCollectFilters } from '@collectC/search-collect-filters';
import { SearchCollectItems } from '@collectC/search-collect-items';
import { SearchMap } from '@collectC/search-map';
import { DialogModule } from 'primeng/dialog';

const PRIMENG = [ButtonModule, DialogModule];

const COMPONENTS = [SearchCollectFilters, SearchMap, SearchCollectItems];

const COMMON = [NgStyle];

@Component({
  selector: 'app-search',
  imports: [...COMPONENTS, ...COMMON, ...PRIMENG],
  templateUrl: './search.html',
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
export class Search {
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
