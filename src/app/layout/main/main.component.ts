import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

const COMPONENTS = [HeaderComponent];

const COMMONS = [RouterOutlet];

@Component({
  selector: 'app-main',
  imports: [...COMPONENTS, ...COMMONS],
  template: `
    <div class="h-screen flex w-full flex-col">
      <app-header />

      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
