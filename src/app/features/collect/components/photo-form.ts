import { Component, inject, signal, ViewChild, type ElementRef, type OnInit } from '@angular/core';
import { PlantUploadStore } from '@collectS/plant-upload-store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-fom',
  template: `
    <div
      class="w-full flex flex-col justify-center items-center"
      (drop)="onFileDrop($event)"
      (dragover)="onDragOver($event)">
      <input type="file" accept="image/*" (change)="onFileChange($event)" hidden #fileInput />
      <div
        class="flex flex-col items-center rounded-lg p-1 w-full sm:w-[80%] md:w-[300px] cursor-pointer border-2 border-[#252525] dark:border-[#ddd] border-dashed"
        [class.success]="uploadSuccess"
        [class.error]="uploadError"
        (click)="fileInput.click()">
        <i class="pi pi-upload my-2" style="font-size: 1.2rem"></i>
        <p class="font-bold">Foto Planta</p>
        <div class="flex flex-col justify-center items-center w-full">
          @if (selectedFile || PlantUploadStore.plantPhotoString()) {
            <img
              class="w-full max-h-[250px] mb-1 rounded-lg"
              [src]="PlantUploadStore.plantPhotoString()"
              alt="Foto planta" />
            <p class="text-center w-[80%] overflow-hidden truncate">
              {{ PlantUploadStore.imageName() }}
            </p>
            ({{ PlantUploadStore.fileSize() }} KB)
          } @else {
            <img class="rounded-lg mb-4" src="/assets/images/empty-photo.jpg" alt="Sem foto" />
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container__dropper.success {
        @apply border-green-800;
      }

      .container__dropper.error {
        @apply border-red-800;
      }
    `,
  ],
})
export class PhotoDataComponent implements OnInit {
  public messageService = inject(MessageService);

  public PlantUploadStore = inject(PlantUploadStore);

  public uploadProgress = signal(0);

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  public selectedFile: File | null = null;

  public uploadSuccess: boolean = false;

  public uploadError: boolean = false;

  public ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0] as File | null;

    this.uploadFile(file);
  }

  public onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public uploadFile(file: File | null): void {
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      this.PlantUploadStore.plantPhotoFile.set(this.selectedFile);

      this.PlantUploadStore.fileSize.set(Math.round(file.size / 1024));

      const reader = new FileReader();

      reader.onload = (e): void => {
        this.PlantUploadStore.plantPhotoString.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.PlantUploadStore.imageName.set(file.name);
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Insira um arquivo de imagem válido!',
        life: 3000,
      });
    }
  }
}
