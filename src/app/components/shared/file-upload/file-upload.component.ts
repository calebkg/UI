import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="file-upload-container">
      <!-- Upload Area -->
      <div class="file-upload-area" 
           [class.drag-over]="isDragging"
           (dragover)="onDragOver($event)"
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)"
           (click)="triggerFileInput()">
        <div class="upload-icon">
          <img src="assets/cloud-add.svg" alt="Upload" width="48" height="48" />
        </div>
        <h4>Choose a file or drag & drop it here</h4>
        <p>{{ acceptedFormats }} formats, up to {{ maxSizeMB }}MB</p>
        <button class="browse-btn" type="button">
          Browse Files
        </button>
        <input type="file" 
               #fileInput
               [multiple]="multiple"
               [accept]="accept"
               (change)="onFileSelected($event)"
               style="display: none;">
      </div>
      
      <!-- Description -->
      <div class="form-group" *ngIf="showDescription">
        <label>Document Description</label>
        <textarea [(ngModel)]="description" 
                  placeholder="Document Description" 
                  rows="3"
                  (change)="onDescriptionChange()"></textarea>
      </div>
      
      <!-- Uploaded Files List -->
      <div class="uploaded-files" *ngIf="files.length > 0">
        <h5>Uploaded Files</h5>
        <div class="file-item" *ngFor="let file of files">
          <div class="file-icon" [class]="'file-' + getFileType(file.type)">
            <img *ngIf="getFileType(file.type) === 'pdf'" src="assets/pdf.svg" alt="PDF" width="28" height="28" />
            <img *ngIf="getFileType(file.type) === 'image'" src="assets/png.svg" alt="Image" width="28" height="28" />
            <img *ngIf="getFileType(file.type) === 'doc'" src="assets/doc.svg" alt="Document" width="28" height="28" />
            <span *ngIf="getFileType(file.type) === 'other'">📄</span>
          </div>
          <div class="file-info">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-size">{{ formatFileSize(file.size) }}</div>
            <div class="file-progress" *ngIf="file.status === 'uploading'">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="file.progress"></div>
              </div>
              <div class="progress-text">{{ file.progress }}%</div>
            </div>
            <div class="file-error" *ngIf="file.status === 'error'">
              {{ file.error }}
            </div>
          </div>
          <button class="delete-file-btn" (click)="removeFile(file)">
            <img src="assets/delete.svg" alt="Delete" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() accept = 'image/jpeg,image/png,application/pdf';
  @Input() multiple = false;
  @Input() maxSizeMB = 50;
  @Input() showDescription = true;
  @Input() files: UploadedFile[] = [];
  
  @Output() filesChange = new EventEmitter<UploadedFile[]>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadComplete = new EventEmitter<UploadedFile[]>();
  
  description = '';
  isDragging = false;
  
  get acceptedFormats(): string {
    const formats = this.accept.split(',').map(format => {
      return format.replace('image/', '').replace('application/', '').toUpperCase();
    });
    return formats.join(', ');
  }
  
  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }
  
  private handleFiles(fileList: FileList): void {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Check file size
      if (file.size > this.maxSizeMB * 1024 * 1024) {
        alert(`File ${file.name} exceeds the maximum size of ${this.maxSizeMB}MB`);
        continue;
      }
      
      // Check file type
      if (this.accept && !this.accept.includes(file.type)) {
        alert(`File ${file.name} is not an accepted file type`);
        continue;
      }
      
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };
      
      newFiles.push(uploadedFile);
      
      // Simulate upload progress
      this.simulateUpload(uploadedFile);
    }
    
    if (newFiles.length > 0) {
      this.files = [...this.files, ...newFiles];
      this.uploadStart.emit();
      this.filesChange.emit(this.files);
    }
  }
  
  private simulateUpload(file: UploadedFile): void {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update file status
        const index = this.files.findIndex(f => f.id === file.id);
        if (index !== -1) {
          this.files[index].status = 'success';
          this.files[index].progress = 100;
          this.files[index].url = URL.createObjectURL(new Blob()); // Fake URL
          this.filesChange.emit(this.files);
          
          // Check if all files are uploaded
          const allUploaded = this.files.every(f => f.status !== 'uploading');
          if (allUploaded) {
            this.uploadComplete.emit(this.files);
          }
        }
      } else {
        // Update progress
        const index = this.files.findIndex(f => f.id === file.id);
        if (index !== -1) {
          this.files[index].progress = Math.round(progress);
          this.filesChange.emit(this.files);
        }
      }
    }, 200);
  }
  
  removeFile(file: UploadedFile): void {
    this.files = this.files.filter(f => f.id !== file.id);
    this.filesChange.emit(this.files);
  }
  
  onDescriptionChange(): void {
    this.descriptionChange.emit(this.description);
  }
  
  getFileType(mimeType: string): string {
    if (mimeType.includes('pdf')) {
      return 'pdf';
    } else if (mimeType.includes('image')) {
      return 'image';
    } else if (mimeType.includes('word') || mimeType.includes('doc')) {
      return 'doc';
    } else {
      return 'other';
    }
  }
  
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}