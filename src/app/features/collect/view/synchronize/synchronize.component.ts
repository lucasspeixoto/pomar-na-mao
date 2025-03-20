import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TimestampPipe } from '../../../../shared/pipes/timestamp/timestamp.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IndexDbCollectService } from '../../../offline-collect/services/index-db-collect.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { PlantData } from '../../models/collect.model';
import { CollectService } from '../../services/collect/collect.service';
import { Router } from '@angular/router';
import { NoSyncDataComponent } from '../../components/no-sync-data/no-sync-data.component';
import { SyncDataAlertComponent } from '../../components/sync-data-alert/sync-data-alert.component';
import { SyncActionsComponent } from '../../components/sync-actions/sync-actions.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SyncDataDetailComponent } from '../../components/sync-data-detail/sync-data-detail.component';
import { SynchronizeService } from '../../services/synchronize/synchronize.service';

const ZORRO = [NzModalModule, NzTableModule, NzAvatarModule, NzCardModule, NzButtonModule];

const COMPONENTS = [
  NoSyncDataComponent,
  SyncDataAlertComponent,
  SyncActionsComponent,
  SyncDataDetailComponent,
];

const COMMON = [DatePipe, TimestampPipe, AsyncPipe];

@Component({
  selector: 'app-synchronize',
  imports: [...ZORRO, ...COMPONENTS, ...COMMON],
  templateUrl: './synchronize.component.html',
  styleUrl: './synchronize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynchronizeComponent {
  public indexDbCollectService = inject(IndexDbCollectService);

  public collectService = inject(CollectService);

  public router = inject(Router);

  public modal = inject(NzModalService);

  public synchronizeService = inject(SynchronizeService);

  public collectedData$ = this.indexDbCollectService.listAllCollects();

  public collectedData = this.indexDbCollectService.collectedData;

  public totalCollectedData = this.indexDbCollectService.totalCollectedData;

  public isUpdateModalVisible = false;

  public selectedCollect!: PlantData;

  public syncAllCollectedData(): void {
    this.collectService.syncAllCollectPlantHandler(this.collectedData());
  }

  public updateCollectData(id: string): void {
    this.selectedCollect = this.collectedData().find(collect => collect.id === id)!;

    this.isUpdateModalVisible = true;
  }

  public deleteCollectData(id: string): void {
    this.showDeleteConfirm(id);
  }

  public syncCollectData(plantData: PlantData): void {
    this.collectService.syncCollectPlantHandler(plantData);
  }

  public showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: 'Tem certeza que deseja excluir essa coleta?',
      nzContent:
        '<b style="color: red;">Ao excluir a coleta ela se perde sem possibilidade de recuperação</b>',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.indexDbCollectService.deleteCollect(id, true).subscribe(),
      nzCancelText: 'Não',
      nzOnCancel: () => {},
    });
  }

  public confirmUpdateCollectData(): void {
    setTimeout(() => {
      this.isUpdateModalVisible = false;

      console.log(this.synchronizeService.syncronizeDataFormValue());

      const newCollectData = {
        created_at: new Date().toISOString(),
        ...this.synchronizeService.syncronizeDataFormValue(),
      } as PlantData;

      this.syncCollectData(newCollectData);
    }, 500);
  }
}
