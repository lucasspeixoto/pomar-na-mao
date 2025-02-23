import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { NzTableModule } from 'ng-zorro-antd/table';
import { CollectService } from '../../services/collect/collect.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-base',
  imports: [NzTableModule, DatePipe],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit {
  public collectService = inject(CollectService);

  public ngOnInit(): void {
    this.collectService.getAllCollectsDataHandler();
  }
}
