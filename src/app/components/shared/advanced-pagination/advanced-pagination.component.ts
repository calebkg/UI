import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advanced-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pagination-container">
      <!-- Pagination Info -->
      <div class="pagination-info" *ngIf="showInfo">
        <span>Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} items</span>
      </div>
      
      <!-- Page Size Selector -->
      <div class="page-size-selector">
        <label>Items per page:</label>
        <select [(ngModel)]="pageSize" (ngModelChange)="onPageSizeChange($event)">
          <option *ngFor="let size of pageSizeOptions" [value]="size">
            {{ size }}
          </option>
        </select>
      </div>
      
      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <button class="page-btn" 
                [disabled]="currentPage === 1" 
                (click)="goToPage(1)"
                title="First page">
          ⟪
        </button>
        
        <button class="page-btn" 
                [disabled]="currentPage === 1" 
                (click)="goToPage(currentPage - 1)"
                title="Previous page">
          ⟨
        </button>
        
        <div class="page-numbers">
          <button *ngFor="let page of visiblePages" 
                  class="page-btn"
                  [class.active]="page === currentPage"
                  (click)="goToPage(page)">
            {{ page }}
          </button>
          
          <span *ngIf="showEllipsis" class="page-ellipsis">...</span>
          
          <button *ngIf="showLastPage" 
                  class="page-btn"
                  [class.active]="totalPages === currentPage"
                  (click)="goToPage(totalPages)">
            {{ totalPages }}
          </button>
        </div>
        
        <button class="page-btn" 
                [disabled]="currentPage === totalPages" 
                (click)="goToPage(currentPage + 1)"
                title="Next page">
          ⟩
        </button>
        
        <button class="page-btn" 
                [disabled]="currentPage === totalPages" 
                (click)="goToPage(totalPages)"
                title="Last page">
          ⟫
        </button>
      </div>
      
      <!-- Jump to Page -->
      <div class="jump-to-page" *ngIf="totalPages > 10">
        <label>Go to page:</label>
        <input type="number" 
               [min]="1" 
               [max]="totalPages"
               [(ngModel)]="jumpToPageValue"
               (keyup.enter)="jumpToPage()"
               class="page-input">
        <button class="jump-btn" (click)="jumpToPage()">Go</button>
      </div>
    </div>
  `,
  styleUrls: ['./advanced-pagination.component.scss']
})
export class AdvancedPaginationComponent {
  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];
  @Input() showInfo = true;
  @Input() maxVisiblePages = 5;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  jumpToPageValue = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  get showEllipsis(): boolean {
    return this.totalPages > this.maxVisiblePages && 
           this.currentPage < this.totalPages - Math.floor(this.maxVisiblePages / 2);
  }

  get showLastPage(): boolean {
    return this.showEllipsis && this.totalPages > this.maxVisiblePages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSizeChange.emit(newPageSize);
  }

  jumpToPage() {
    if (this.jumpToPageValue >= 1 && this.jumpToPageValue <= this.totalPages) {
      this.goToPage(this.jumpToPageValue);
    }
  }
}