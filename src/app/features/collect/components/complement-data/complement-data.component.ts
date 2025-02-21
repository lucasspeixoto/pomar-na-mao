import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-complement-data',
  imports: [NzCardModule],
  templateUrl: './complement-data.component.html',
  styleUrls: ['./complement-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplementDataComponent {}
