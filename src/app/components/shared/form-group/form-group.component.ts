import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-group" [class.required]="required" [class.has-error]="error">
      <label *ngIf="label">
        {{ label }}
        <span class="required-indicator" *ngIf="required">*</span>
      </label>
      <div class="form-control-wrapper">
        <ng-content></ng-content>
        <div class="error-message" *ngIf="error">{{ error }}</div>
      </div>
      <div class="help-text" *ngIf="helpText">{{ helpText }}</div>
    </div>
  `,
  styles: [`
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
    
    .form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-blue);
      margin-bottom: 5px;
    }
    
    .required-indicator {
      color: #dc3545;
      margin-left: 3px;
    }
    
    .form-control-wrapper {
      position: relative;
    }
    
    .error-message {
      color: #dc3545;
      font-size: 11px;
      margin-top: 4px;
      font-weight: 500;
    }
    
    .help-text {
      font-size: 11px;
      color: var(--text-light);
      margin-top: 4px;
    }
    
    .form-group.required label {
      font-weight: 700;
    }
    
    .form-group.has-error :host ::ng-deep input,
    .form-group.has-error :host ::ng-deep select,
    .form-group.has-error :host ::ng-deep textarea {
      border-color: #dc3545;
    }
    
    @media (max-width: 600px) {
      .form-group {
        margin-bottom: 12px;
      }
      
      .form-group label {
        font-size: 11px;
      }
    }
  `]
})
export class FormGroupComponent {
  @Input() label?: string;
  @Input() required = false;
  @Input() error?: string;
  @Input() helpText?: string;
}