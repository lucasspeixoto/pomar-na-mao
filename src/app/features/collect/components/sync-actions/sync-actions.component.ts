import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlantData } from '../../models/collect.model';

@Component({
  selector: 'app-sync-actions',
  imports: [NzIconModule],
  template: `
    <section>
      <nz-icon
        class="update-icon"
        (click)="updateCollectDataHandler()"
        nzType="edit"
        nzTheme="outline" />

      <nz-icon
        class="sync-icon"
        (click)="syncCollectDataHandler()"
        nzType="cloud-sync"
        nzTheme="outline" />

      <nz-icon
        class="delete-icon"
        (click)="deleteCollectDataHandler()"
        nzType="delete"
        nzTheme="outline" />
    </section>
  `,
  styles: [
    `
      nz-icon {
        font-size: larger;
        opacity: 0.8;

        &:hover {
          font-weight: bold;
          cursor: pointer;
          opacity: 1;
        }
      }
    `,
  ],
})
export class SyncActionsComponent {
  @Input() public data!: PlantData;

  @Output() public updateCollectData = new EventEmitter<string>();

  @Output() public syncCollectData = new EventEmitter<PlantData>();

  @Output() public deleteCollectData = new EventEmitter<string>();

  public updateCollectDataHandler(): void {
    this.updateCollectData.emit(this.data.id);
  }

  public syncCollectDataHandler(): void {
    this.syncCollectData.emit(this.data);
  }

  public deleteCollectDataHandler(): void {
    this.deleteCollectData.emit(this.data.id);
  }
}
