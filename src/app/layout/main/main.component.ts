import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

const COMPONENTS = [HeaderComponent, FooterComponent];

const COMMONS = [RouterOutlet];

@Component({
  selector: 'app-main',
  imports: [...COMPONENTS, ...COMMONS],
  template: `
    <div class="h-screen flex w-full flex-col">
      <app-header />

      <router-outlet />

      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
