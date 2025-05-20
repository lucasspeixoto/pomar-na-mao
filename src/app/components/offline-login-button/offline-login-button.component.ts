import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offline-login-button',
  imports: [RouterLink],
  templateUrl: './offline-login-button.component.html',
  styleUrls: ['./offline-login-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineLoginButtonComponent {}
