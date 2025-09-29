import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './pages/loading/loading.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, LoadingComponent, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
