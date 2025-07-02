import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [class]="statusClass">
      {{ status }}
    </span>
  `,
  styles: [`
    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      display: inline-block;
    }
    
    .status-open {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .status-approved {
      background: #d4edda;
      color: #155724;
    }
    
    .status-rejected {
      background: #f8d7da;
      color: #721c24;
    }
    
    .status-posted {
      background: #e8f5e8;
      color: #4caf50;
    }
    
    .status-leave-granted {
      background: #e8f5e8;
      color: #4caf50;
    }
    
    .status-draft {
      background: #e9ecef;
      color: #495057;
    }
    
    .status-cancelled {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  
  get statusClass(): string {
    if (!this.status) return '';
    
    return 'status-' + this.status.toLowerCase().replace(/\s+/g, '-');
  }
}