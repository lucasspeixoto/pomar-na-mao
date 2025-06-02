import { Component, inject } from '@angular/core';
import { LoadingService } from '@sharedS/loading/loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  public loadingService = inject(LoadingService);
}
