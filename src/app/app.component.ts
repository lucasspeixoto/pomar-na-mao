import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './pages/loading/loading.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoadingComponent, ToastComponent],
  template: `
    <app-loading />
    <app-toast />
    <router-outlet />
  `,
})
export class AppComponent {}
