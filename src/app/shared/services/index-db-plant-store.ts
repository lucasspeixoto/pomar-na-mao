/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, filter, first, Observable, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';

import { PlantData } from '@collectM/collect.model';
import { environment } from '@env/environment';
import { LoadingStore } from './loading-store';

@Injectable({
  providedIn: 'root',
})
export class IndexDbPlantStore {
  public messageService = inject(MessageService);

  private platformId = inject(PLATFORM_ID);

  public loadingStore = inject(LoadingStore);

  private readonly store = { name: 'collects', key: 'id' };

  private readonly database$ = new BehaviorSubject<IDBDatabase | null>(null);

  private isDbReady = new BehaviorSubject(false);

  private readonly secretKey = environment.INDEXDB_KEY;

  public collectedData = signal<PlantData[]>([]);

  public totalCollectedData = computed(() => this.collectedData().length);

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

  public listAllCollects(): Observable<PlantData[]> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

        return new Observable<PlantData[]>(obs => {
          const request = this.store$.getAll();

          request.onsuccess = () => {
            try {
              const decryptedTasks = request.result.map(encryptedTask => {
                const decryptedData = encryptedTask.encryptedData; //this.decrypt(encryptedTask.encryptedData) as Object;

                return decryptedData as PlantData;
              });

              obs.next(decryptedTasks);
              this.collectedData.set(decryptedTasks);
              //this.totalCollectedData.set(decryptedTasks.length);
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

          this.loadingStore.stopLoading();
        });
      })
    );
  }

  public addCollect(plantData: PlantData): Observable<PlantData> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

        return new Observable<PlantData>(obs => {
          const encryptedTask = {
            id: plantData.id,
            encryptedData: plantData,
          };

          const request = this.store$.add(encryptedTask);

          request.onsuccess = () => {
            obs.next(plantData);
            //this.totalCollectedData.update(current => current + 1);
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

          this.loadingStore.stopLoading();
        });
      })
    );
  }

  public updateCollect(plantData: PlantData, showMessages: boolean): Observable<void> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

        return new Observable<void>(obs => {
          const request = this.store$.put({
            id: plantData.id,
            encryptedData: plantData,
          });

          request.onsuccess = () => {
            this.collectedData.update(items =>
              items.map(item => (item.id === plantData.id ? plantData : item))
            );

            if (showMessages) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Coleta atualizada com sucesso!',
                life: 3000,
              });
            }

            obs.next();
            obs.complete();
          };

          request.onerror = () => {
            if (showMessages) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Erro',
                detail: 'Falha ao atualizar este registro de coleta no dispositivo!',
                life: 3000,
              });
            }

            obs.error('Falha ao atualizar este registro de coleta no dispositivo!');
          };

          this.loadingStore.stopLoading();
        });
      })
    );
  }

  public deleteCollect(id: string, showMessages: boolean): Observable<void> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

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
            //this.totalCollectedData.update(current => current - 1);
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

          this.loadingStore.stopLoading();
        });
      })
    );
  }

  public deleteManyCollects(ids: string[], showMessages: boolean): Observable<void> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

        return new Observable<void>(() => {
          const transaction = this.store$.transaction;
          const store = transaction.objectStore(this.store.name);

          let successCount = 0;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          let errorCount = 0;

          ids.forEach(id => {
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = () => {
              successCount++;
              //this.totalCollectedData.update(current => current - 1);
              this.collectedData.update(items => items.filter(item => item.id !== id));
            };

            deleteRequest.onerror = () => {
              errorCount++;
            };
          });

          transaction.oncomplete = () => {
            if (showMessages) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `${successCount} items deleted successfully`,
                life: 3000,
              });
            }
          };

          this.loadingStore.stopLoading();
        });
      })
    );
  }

  public findCollectById(id: string): Observable<PlantData | null> {
    return this.waitForDB().pipe(
      switchMap(() => {
        this.loadingStore.startLoading();

        return new Observable<PlantData | null>(obs => {
          const request = this.store$.get(id);

          request.onsuccess = () => {
            const result = request.result;

            if (result) {
              const decryptedData = result.encryptedData; // Decrypt if needed
              obs.next(decryptedData as PlantData);
            } else {
              obs.next(null); // Return null if no record is found
            }

            obs.complete();
            this.loadingStore.stopLoading();
          };

          request.onerror = () => {
            obs.error('Falha ao buscar o registro de coleta no dispositivo!');
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro',
              detail: 'Falha ao buscar o registro de coleta no dispositivo!',
              life: 3000,
            });

            this.loadingStore.stopLoading();
          };
        });
      })
    );
  }
}
