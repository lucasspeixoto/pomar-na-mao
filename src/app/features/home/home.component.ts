import { Component, model } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { servicesItems, type Service } from './constants/services';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule],
  templateUrl: `./home.component.html`,
  styles: [
    `
      .card-background {
        background-image: url('/assets/images/card-wave.png');
        background-size: cover;
        background-position: bottom center;
        background-repeat: no-repeat;
      }

      .card-icon {
        font-size: 2rem;

        @media (max-width: 768px) {
          font-size: 1.3rem;
        }
      }
    `,
  ],
})
export class HomeComponent {
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
