import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  type ElementRef,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CollectFormService } from '../../services/collect-form.service';

@Component({
  selector: 'app-plant-upload',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './plant-upload.component.html',
  styleUrls: ['./plant-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantUploadComponent {
  public imageName = signal('');

  public fileSize = signal(0);

  public uploadProgress = signal(0);

  public plantPhotoString = signal('');

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  public selectedFile: File | null = null;

  public uploadSuccess: boolean = false;

  public uploadError: boolean = false;

  public messageService = inject(NzMessageService);

  public collectFormService = inject(CollectFormService);

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

      this.fileSize.set(Math.round(file.size / 1024));

      const reader = new FileReader();

      reader.onload = (e): void => {
        this.collectFormService.plantPhotoString.set(e.target?.result as string);
      };

      reader.readAsDataURL(file);

      this.uploadSuccess = true;
      this.uploadError = false;
      this.imageName.set(file.name);
    } else {
      this.uploadSuccess = false;
      this.uploadError = true;
      this.messageService.error('Insira um arquivo de imagem!');
    }
  }
}
