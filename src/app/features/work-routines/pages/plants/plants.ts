import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plants',
  imports: [],
  templateUrl: './plants.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Plants {}
