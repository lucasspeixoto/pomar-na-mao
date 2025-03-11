import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, tap, filter } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public notificationService = inject(NzNotificationService);

  private swUpdate = inject(SwUpdate);

  constructor() {
    this.initializeUpdateChecks();
  }
  public initializeUpdateChecks(): void {
    if (!this.swUpdate.isEnabled) return;

    interval(60 * 500).subscribe(async () => this.checkForUpdate());

    this.swUpdate.versionUpdates
      .pipe(
        tap(event => console.log(`Evento de atualização: ${event.type}`)),
        filter(event => event.type === 'VERSION_READY')
      )
      .subscribe(() => this.promptUserToUpdate());

    this.swUpdate.unrecoverable.subscribe(() => {
      this.notificationService.error('Error', 'Algo deu errado, o aplicativo irá recarregar!');

      window.location.reload();
    });
  }

  public async checkForUpdate(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) return false;

    try {
      return await this.swUpdate.checkForUpdate();
    } catch (error) {
      console.log('Erro ao buscar por atualizações: ' + error);
      return true;
    }
  }

  private promptUserToUpdate(): void {
    if (confirm('Nova versão disponível. Deseja atualizar agora ?')) {
      this.swUpdate
        .activateUpdate()
        .then(() => window.location.reload())
        .catch(error => console.log(error));
    }
  }
}
