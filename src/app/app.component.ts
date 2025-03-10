import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectivityComponent } from './shared/components/connectivity/connectivity.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectivityComponent],
  template: `
    <router-outlet />
    <app-connectivity />
  `,
  styles: ``,
})
export class AppComponent {}
