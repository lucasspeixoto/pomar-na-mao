import { Component, inject, signal, ViewChild, type ElementRef, type OnInit } from '@angular/core';
import { PlantUploadService } from '@collectS/plant-upload/plant-upload.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-data',
  templateUrl: './photo-data.component.html',
  styleUrls: ['./photo-data.component.scss'],
})
export class PhotoDataComponent implements OnInit {
  public messageService = inject(MessageService);

  public plantUploadService = inject(PlantUploadService);

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

      this.plantUploadService.plantPhotoFile.set(this.selectedFile);

      this.plantUploadService.fileSize.set(Math.round(file.size / 1024));

      const reader = new FileReader();

      reader.onload = (e): void => {
        this.plantUploadService.plantPhotoString.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.plantUploadService.imageName.set(file.name);
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
