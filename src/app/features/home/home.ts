import { Component, inject, model } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { servicesItems, Service } from './constants/services';
import { LayoutConfig } from 'src/app/core/layout/layout-config';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule],
  templateUrl: `./home.html`,
  styles: [
    `
      .card-icon {
        font-size: 2rem;

        @media (max-width: 768px) {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class Home {
  public layoutService = inject(LayoutConfig);

  public searchBar = model('');

  public servicesItems = servicesItems;

  public get filteredServicesItems(): Service[] {
    const filter = this.searchBar().toLowerCase();

    return this.servicesItems.filter(
      item =>
        item.title.toLowerCase().includes(filter) || item.subtitle.toLowerCase().includes(filter)
    );
  }
}
