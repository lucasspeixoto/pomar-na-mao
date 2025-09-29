import { Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { ResetPasswordFormComponent } from '../../../shared/components/auth/reset-password-form/reset-password-form.component';

@Component({
  selector: 'app-reset-password',
  imports: [AuthPageLayoutComponent, ResetPasswordFormComponent],
  template: `
    <app-auth-page-layout>
      <app-reset-password-form class="flex flex-col flex-1" />
    </app-auth-page-layout>
  `,
  styles: ``,
})
export class ResetPasswordComponent {}
