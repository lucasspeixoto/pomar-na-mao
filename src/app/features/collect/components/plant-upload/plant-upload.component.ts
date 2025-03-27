import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PlantUploadService } from '../../services/plant-upload/plant-upload.service';
import { CollectStepService } from '../../services/collect-step/collect-step.service';

@Component({
  selector: 'app-plant-upload',
  imports: [NzButtonModule, NzIconModule, NzCardModule],
  templateUrl: './plant-upload.component.html',
  styleUrls: ['./plant-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantUploadComponent {
  public messageService = inject(NzMessageService);

  public plantUploadService = inject(PlantUploadService);

  private collectStepService = inject(CollectStepService);

  public uploadProgress = signal(0);

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  public selectedFile: File | null = null;

  public uploadSuccess: boolean = false;

  public uploadError: boolean = false;

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

      this.plantUploadService.fileSize.set(Math.round(file.size / 1024));

      const reader = new FileReader();

      reader.onload = (e): void => {
        this.plantUploadService.plantPhotoString.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.plantUploadService.imageName.set(file.name);

      setTimeout(() => {
        this.collectStepService.setCollectStep(2);
      }, 1000);
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.messageService.error('Insira um arquivo de imagem!');
    }
  }
}
