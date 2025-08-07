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
    <ng-container *ngFor="let item of menuItems; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenu implements OnInit {
  public menuItems: MenuItem[] = [];

  private authenticationService = inject(AuthenticationApi);

  public isAdmin = false;

  public isLogged = false;

  public ngOnInit(): void {
    this.isAdmin = this.authenticationService.isAdminCheckHandler();

    this.isLogged = this.authenticationService.isLoggedCheckHandler();

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
            label: 'Rotinas de Trabalho',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-check-square',
            items: [
              {
                label: 'Cadastrar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-database',
                routerLink: ['/app/rotinas-de-trabalho/cadastrar'],
              },
              {
                label: 'Sincronizar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-sync',
                routerLink: ['/app/rotinas-de-trabalho/sincronizar'],
              },
              {
                label: 'Consultar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-search-plus',
                routerLink: ['/app/rotinas-de-trabalho/consultar'],
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
