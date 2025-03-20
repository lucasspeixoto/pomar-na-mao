import { Component, inject } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-no-sync-data',
  imports: [NzEmptyModule, NzButtonModule],
  template: `
    <nz-empty
      nzNotFoundImage="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      [nzNotFoundContent]="contentTpl"
      [nzNotFoundFooter]="footerTpl">
      <ng-template #contentTpl>
        <span> Não há dados para sincronizar </span>
      </ng-template>
      <ng-template #footerTpl>
        <button nz-button nzType="primary" (click)="router.navigateByUrl('/collect/register')">
          Coletar
        </button>
      </ng-template>
    </nz-empty>
  `,
})
export class NoSyncDataComponent {
  public router = inject(Router);
}
