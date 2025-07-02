import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-section">
      <h3 *ngIf="title">{{ title }}</h3>
      <div class="form-section-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .form-section {
      margin-bottom: 30px;
    }
    
    .form-section h3 {
      color: var(--accent-green);
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e9ecef;
    }
    
    .form-section-content {
      display: block;
    }
    
    @media (max-width: 900px) {
      .form-section {
        margin-bottom: 20px;
      }
      
      .form-section h3 {
        font-size: 15px;
        margin-bottom: 15px;
      }
    }
    
    @media (max-width: 600px) {
      .form-section {
        margin-bottom: 15px;
      }
      
      .form-section h3 {
        font-size: 14px;
        margin-bottom: 12px;
      }
    }
  `]
})
export class FormSectionComponent {
  @Input() title?: string;
}