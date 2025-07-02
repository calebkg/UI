import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActionButton {
  label: string;
  icon?: string;
  class?: string;
  action: string;
  visible?: (item: any) => boolean;
  disabled?: (item: any) => boolean;
  tooltip?: string;
}

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="action-buttons" [class.mobile]="mobile">
      <button *ngFor="let action of visibleActions" 
              class="action-btn" 
              [class]="action.class"
              [class.mobile]="mobile"
              [disabled]="isDisabled(action)"
              (click)="onActionClick(action)"
              [title]="action.tooltip || action.label">
        <img *ngIf="action.icon" [src]="action.icon" [alt]="action.label" [width]="mobile ? 16 : 24" [height]="mobile ? 16 : 24" />
        {{ action.label }}
      </button>
    </div>
  `,
  styles: [`
    .action-buttons {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    
    .action-buttons.mobile {
      justify-content: center;
    }
    
    .action-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      text-transform: uppercase;
    }
    
    .action-btn.mobile {
      padding: 8px 12px;
      font-size: 11px;
    }
    
    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .action-btn.edit-btn {
      background: var(--primary-blue);
      color: var(--white);
    }
    
    .action-btn.edit-btn:hover:not(:disabled) {
      background: var(--secondary-blue);
    }
    
    .action-btn.view-btn {
      background: var(--primary-blue);
      color: var(--white);
    }
    
    .action-btn.view-btn:hover:not(:disabled) {
      background: var(--secondary-blue);
    }
    
    .action-btn.approvers-btn {
      background: var(--primary-blue);
      color: var(--white);
    }
    
    .action-btn.approvers-btn:hover:not(:disabled) {
      background: var(--secondary-blue);
    }
    
    .action-btn.delete-btn {
      background: #dc3545;
      color: var(--white);
    }
    
    .action-btn.delete-btn:hover:not(:disabled) {
      background: #c82333;
    }
  `]
})
export class ActionButtonsComponent {
  @Input() actions: ActionButton[] = [];
  @Input() item: any;
  @Input() mobile = false;
  
  @Output() actionClick = new EventEmitter<{ action: string; item: any }>();
  
  get visibleActions(): ActionButton[] {
    return this.actions.filter(action => 
      !action.visible || action.visible(this.item)
    );
  }
  
  isDisabled(action: ActionButton): boolean {
    return action.disabled ? action.disabled(this.item) : false;
  }
  
  onActionClick(action: ActionButton): void {
    if (this.isDisabled(action)) return;
    
    this.actionClick.emit({
      action: action.action,
      item: this.item
    });
  }
}