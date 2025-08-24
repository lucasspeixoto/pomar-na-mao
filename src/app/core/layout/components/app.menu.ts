import { AuthenticationApi } from '../../auth/services/authentication-api';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    @for (item of menuItems; track item; let i = $index) {
      @if (item.separator) {
        <li class="menu-separator"></li>
      } @else {
        <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
      }
    }
  </ul> `,
})
export class AppMenu implements OnInit {
  public menuItems: MenuItem[] = [];

  private authenticationService = inject(AuthenticationApi);

  public isLogged = false;

  public isAdmin = false;

  public ngOnInit(): void {
    this.isLogged = this.authenticationService.isLoggedCheckHandler();

    this.isAdmin = this.authenticationService.isAdminCheckHandler();

    this.menuItems = [
      {
        label: 'Menu',
        visible: true,
        items: [
          {
            label: 'Início',
            visible: true,
            icon: 'pi pi-fw pi-home',
            routerLink: ['/app/inicio'],
          },
          {
            label: 'Aprovações',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-calendar-clock',
            items: [
              {
                label: 'Rotinas de Trabalho',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/app/aprovacoes/rotinas-de-trabalho'],
              },
              {
                label: 'Rotinas de Inspeção',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-eye',
                routerLink: ['/app/aprovacoes/rotinas-de-inspecao'],
              },
            ],
          },
        ],
      },
    ];
  }

  public checkIsAdmin(): boolean {
    return this.authenticationService.isAdminCheckHandler();
  }
}
