import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Loading } from './pages/loading/loading';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Loading, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
