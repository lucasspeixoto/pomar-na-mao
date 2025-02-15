import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-not-found',
  imports: [NzResultModule, NzButtonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  private router = inject(Router);

  public navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
