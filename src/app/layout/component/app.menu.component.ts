import { AuthenticationService } from './../../auth/services/authentication.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitemComponent, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of menuItems; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenuComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  private authenticationService = inject(AuthenticationService);

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
            label: 'Coleta',
            visible: this.isAdmin,
            icon: 'pi pi-fw pi-check-square',
            items: [
              {
                label: 'Cadastrar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-database',
                routerLink: ['/inicio/coleta/cadastrar'],
              },
              {
                label: 'Sincronizar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-sync',
                routerLink: ['/inicio/coleta/sincronizar'],
              },
              {
                label: 'Consultar',
                visible: this.isAdmin,
                icon: 'pi pi-fw pi-search-plus',
                routerLink: ['/inicio/coleta/consultar'],
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
