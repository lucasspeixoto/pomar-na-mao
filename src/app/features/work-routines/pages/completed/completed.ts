import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-completed',
  imports: [],
  templateUrl: './completed.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Completed {}
