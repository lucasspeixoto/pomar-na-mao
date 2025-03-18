/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, filter, first, Observable, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { PlantData } from '../../collect/models/collect.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class IndexDbCollectService {
  public messageService = inject(NzMessageService);

  private platformId = inject(PLATFORM_ID);

  private readonly store = { name: 'collects', key: 'id' };

  private readonly database$ = new BehaviorSubject<IDBDatabase | null>(null);

  private isDbReady = new BehaviorSubject(false);

  private readonly secretKey = environment.INDEXDB_KEY;

  public totalCollectedData = signal(0);

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

            this.messageService.success('Coleta armazenada com sucesso!');
          };

          request.onerror = () => {
            obs.error('Falha ao aidicionar este registro de coleta no dispositivo!');
            this.messageService.error(
              'Falha ao aidicionar este registro de coleta no dispositivo!'
            );
          };
        });
      })
    );
  }

  public deleteCollect(id: string): Observable<void> {
    return this.waitForDB().pipe(
      switchMap(() => {
        return new Promise<void>((resolve, reject) => {
          const checkRequest = this.store$.get(id);

          checkRequest.onsuccess = () => {
            if (!checkRequest.result) {
              reject('Registro não encontrado!');
              this.messageService.error('Registro não encontrado no dispositivo!');
              return;
            }
          };

          const request = this.store$.delete(id);

          request.onsuccess = () => {
            this.totalCollectedData.update(current => current - 1);
            resolve();
            this.messageService.success('Coleta excluída com sucesso!');
          };

          request.onerror = () => {
            reject('Falha ao excluir este registro de coleta no dispositivo!');
            this.messageService.error('Falha ao excluir este registro de coleta no dispositivo!');
          };
        });
      })
    );
  }

  public listAllCollects(): Observable<PlantData[]> {
    return this.waitForDB().pipe(
      switchMap(() => {
        return new Observable<PlantData[]>(obs => {
          const request = this.store$.getAll();

          request.onsuccess = () => {
            try {
              const decryptedTasks = request.result.map(encryptedTask => {
                const decryptedData = this.decrypt(encryptedTask.encryptedData) as Object;

                return decryptedData as PlantData;
              });

              obs.next(decryptedTasks);
              this.totalCollectedData.set(decryptedTasks.length);
              obs.complete();
            } catch {
              obs.error('Descriptografia falhou!');
              this.messageService.error('Descriptografia falhou!');
            }
          };

          request.onerror = () => {
            obs.error('Listagem de coletas falhou!');
            this.messageService.error('Listagem de coletas falhou!');
          };
        });
      })
    );
  }
}
