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
