import { Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { ForgotPasswordFormComponent } from '../../../shared/components/auth/forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password',
  imports: [AuthPageLayoutComponent, ForgotPasswordFormComponent],
  template: `
    <app-auth-page-layout>
      <app-forgot-password-form
        class="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar" />
    </app-auth-page-layout>
  `,
  styles: ``,
})
export class ForgotPasswordComponent {}
