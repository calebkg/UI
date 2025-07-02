import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-row" [class.single-column]="singleColumn">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 15px;
    }
    
    .form-row.single-column {
      grid-template-columns: 1fr;
    }
    
    @media (max-width: 900px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 15px;
      }
    }
    
    @media (max-width: 600px) {
      .form-row {
        gap: 12px;
        margin-bottom: 12px;
      }
    }
  `]
})
export class FormRowComponent {
  @Input() singleColumn = false;
}