import { Component, inject, model } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { servicesItems, type Service } from './constants/services';
import { LayoutService } from '@layoutS/layout.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule, NgClass],
  templateUrl: `./home.component.html`,
  styles: [
    `
      .collect-dark-background {
        background-image: url('/assets/images/collect-card-dark.svg');
        background-size: cover;
        background-position: bottom center;
        background-repeat: no-repeat;
      }

      .collect-light-background {
        background-image: url('/assets/images/collect-card-light.svg');
        background-size: cover;
        background-position: bottom center;
        background-repeat: no-repeat;
      }

      .card-icon {
        font-size: 1.5rem;

        @media (max-width: 768px) {
          font-size: 1.1rem;
        }
      }
    `,
  ],
})
export class HomeComponent {
  public layoutService = inject(LayoutService);

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
