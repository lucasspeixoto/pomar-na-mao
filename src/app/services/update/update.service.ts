import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { interval, tap, filter, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public messageService = inject(MessageService);

  public swUpdate = inject(SwUpdate);

  constructor() {
    this.initializeUpdateChecks();
  }
  public initializeUpdateChecks(): void {
    if (!this.swUpdate.isEnabled) return;

    interval(60 * 500).subscribe(async () => this.checkForUpdate());

    this.swUpdate.versionUpdates
      .pipe(
        first(),
        tap(event => console.log(`Evento de atualização: ${event.type}`)),
        filter(event => event.type === 'VERSION_READY')
      )
      .subscribe(() => this.promptUserToUpdate());

    this.swUpdate.unrecoverable.subscribe(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Info',
        detail: 'Algo deu errado. O aplicativo irá recarregar!',
        life: 3000,
      });

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
