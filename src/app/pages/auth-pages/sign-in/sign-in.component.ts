import { Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { SigninFormComponent } from '../../../shared/components/auth/signin-form/signin-form.component';

@Component({
  selector: 'app-sign-in',
  imports: [AuthPageLayoutComponent, SigninFormComponent],
  template: `
    <app-auth-page-layout>
      <app-signin-form class="flex flex-col flex-1" />
    </app-auth-page-layout>
  `,
  styles: ``,
})
export class SignInComponent {}
