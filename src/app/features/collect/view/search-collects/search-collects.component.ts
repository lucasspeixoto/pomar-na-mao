import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CollectService } from '../../services/collect/collect.service';
import { DatePipe } from '@angular/common';
import { TimestampPipe } from '../../../../shared/pipes/timestamp/timestamp.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-collects',
  imports: [NzTableModule, DatePipe, TimestampPipe, NzAvatarModule, NzCardModule, NzIconModule],
  templateUrl: './search-collects.component.html',
  styleUrl: './search-collects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCollectsComponent implements OnInit {
  public collectService = inject(CollectService);

  public expandSet = new Set<string>();

  public onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  public ngOnInit(): void {
    this.collectService.getAllCollectsDataHandler();
  }
}
