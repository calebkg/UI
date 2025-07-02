import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-content" [class.modal-large]="size === 'large'" [class.modal-small]="size === 'small'">
        <div class="modal-header" [style.background]="headerColor">
          <h2>{{ title }}</h2>
          <button class="close-btn" (click)="close()" aria-label="Close modal">×</button>
        </div>
        
        <div class="modal-body">
          <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: data }"></ng-container>
          </ng-container>
          <ng-content *ngIf="!contentTemplate"></ng-content>
        </div>
        
        <div class="modal-footer" *ngIf="showFooter">
          <button *ngIf="showCancelButton" class="btn btn-secondary" (click)="cancel()">
            {{ cancelText }}
          </button>
          <button *ngIf="showConfirmButton" class="btn btn-primary" (click)="confirm()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() headerColor = 'var(--accent-green)';
  @Input() showFooter = true;
  @Input() showCancelButton = true;
  @Input() showConfirmButton = true;
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  @Input() closeOnOverlayClick = true;
  @Input() contentTemplate?: TemplateRef<any>;
  @Input() data: any;
  
  @Output() closed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  
  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.close();
    }
  }
  
  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }
  
  cancel(): void {
    this.cancelled.emit();
    this.close();
  }
  
  confirm(): void {
    this.confirmed.emit();
    this.close();
  }
  
  open(data?: any): void {
    if (data) {
      this.data = data;
    }
    this.isOpen = true;
  }
}