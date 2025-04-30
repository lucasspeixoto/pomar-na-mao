/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { BehaviorSubject, filter, first, Observable, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { LoadingService } from '../loading/loading.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import type { PlantData } from 'src/app/features/collect/models/collect.model';

@Injectable({
  providedIn: 'root',
})
export class IndexDbCollectService {
  public messageService = inject(MessageService);

  private platformId = inject(PLATFORM_ID);

  public loadingService = inject(LoadingService);

  private readonly store = { name: 'collects', key: 'id' };

  private readonly database$ = new BehaviorSubject<IDBDatabase | null>(null);

  private isDbReady = new BehaviorSubject(false);

  private readonly secretKey = environment.INDEXDB_KEY;

  public totalCollectedData = signal(0);

  public collectedData = signal<PlantData[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initDB();
    }
  }

  private initDB(): void {
    const request = indexedDB.open('CollectDataDB', 1);

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(this.store.name)) {
        db.createObjectStore(this.store.name, { keyPath: this.store.key });
      }
    };

    request.onsuccess = (event): void => {
      this.database$.next((event.target as IDBOpenDBRequest).result);
      this.isDbReady.next(true);
    };
  }

  private encrypt(data: unknown): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  private decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  private waitForDB(): Observable<boolean> {
    return this.isDbReady.pipe(
      filter(ready => ready),
      first()
    );
  }

  private get store$(): IDBObjectStore {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('IndexedDB não está disponível neste dispositivo!');
    }

    const database = this.database$.getValue();

    return (
      database?.transaction(this.store.name, 'readwrite').objectStore(this.store.name) ??
      (() => {
        throw new Error('DB não inicializado!');
      })()
    );
  }

  public addCollect(plantData: PlantData): Observable<PlantData> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingService.isLoading.set(true);

        return new Observable<PlantData>(obs => {
          const encryptedTask = {
            id: plantData.id,
            encryptedData: this.encrypt({ ...plantData }),
          };

          const request = this.store$.add(encryptedTask);

          request.onsuccess = () => {
            obs.next(plantData);
            this.totalCollectedData.update(current => current + 1);
            obs.complete();

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Coleta armazenada com sucesso!',
              life: 3000,
            });
          };

          request.onerror = () => {
            obs.error('Falha ao aidicionar este registro de coleta no dispositivo!');
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro',
              detail: 'Falha ao aidicionar este registro de coleta no dispositivo!',
              life: 3000,
            });
          };

          this.loadingService.isLoading.set(false);
        });
      })
    );
  }

  public deleteCollect(id: string, showMessages: boolean): Observable<void> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingService.isLoading.set(true);

        return new Promise<void>((resolve, reject) => {
          const checkRequest = this.store$.get(id);

          checkRequest.onsuccess = () => {
            if (!checkRequest.result) {
              reject('Registro não encontrado!');

              if (showMessages) {
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Erro',
                  detail: 'Registro não encontrado no dispositivo!',
                  life: 3000,
                });
              }

              return;
            }
          };

          const request = this.store$.delete(id);

          request.onsuccess = () => {
            this.totalCollectedData.update(current => current - 1);
            this.collectedData.update(items => items.filter(item => item.id !== id));
            if (showMessages) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Coleta pendente excluída da listagem!',
                life: 3000,
              });
            }
            resolve();
          };

          request.onerror = () => {
            reject('Falha ao excluir este registro de coleta no dispositivo!');

            this.messageService.add({
              severity: 'warn',
              summary: 'Erro',
              detail: 'Falha ao excluir este registro de coleta no dispositivo!',
              life: 3000,
            });
          };

          this.loadingService.isLoading.set(false);
        });
      })
    );
  }

  public listAllCollects(): Observable<PlantData[]> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingService.isLoading.set(true);

        return new Observable<PlantData[]>(obs => {
          const request = this.store$.getAll();

          request.onsuccess = () => {
            try {
              const decryptedTasks = request.result.map(encryptedTask => {
                const decryptedData = this.decrypt(encryptedTask.encryptedData) as Object;

                return decryptedData as PlantData;
              });

              obs.next(decryptedTasks);
              this.collectedData.set(decryptedTasks);
              this.totalCollectedData.set(decryptedTasks.length);
              console.log(decryptedTasks.length);
              obs.complete();
            } catch {
              obs.error('Descriptografia falhou!');
              this.messageService.add({
                severity: 'warn',
                summary: 'Erro',
                detail: 'Descriptografia falhou!',
                life: 3000,
              });
            }
          };

          request.onerror = () => {
            obs.error('Listagem de coletas falhou!');
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro',
              detail: 'Listagem de coletas falhou!',
              life: 3000,
            });
          };

          this.loadingService.isLoading.set(false);
        });
      })
    );
  }
}
