import { AuthenticationService } from './../../authentication/services/authentication.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { menuItems } from './main-items';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    NzTypographyModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzToolTipModule,
    NzButtonModule,
    LoadingComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public isCollapsed = false;

  public isDrawerVisible = false;

  public menuItems = menuItems;

  public authenticationService = inject(AuthenticationService);

  public loadingService = inject(LoadingService);

  public currentUser = this.authenticationService.currentUser;
}
