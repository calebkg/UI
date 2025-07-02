import { Component, Input, Output, EventEmitter, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdvancedPaginationComponent } from '../advanced-pagination/advanced-pagination.component';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'currency' | 'status' | 'actions';
}

export interface ActionButton {
  label: string;
  icon?: string;
  class?: string;
  action: string;
  visible?: (item: any) => boolean;
}

export interface PaginationConfig {
  enabled: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  showInfo: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, AdvancedPaginationComponent],
  template: `
    <!-- Loading State -->
    <div *ngIf="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading data...</p>
    </div>

    <!-- Desktop Table -->
    <div class="table-container hide-mobile" *ngIf="!loading">
      <table class="data-table">
        <thead>
          <tr>
            <th *ngFor="let column of columns" 
                [style.width]="column.width"
                [class.sortable]="column.sortable"
                (click)="onSort(column)">
              {{ column.header }}
              <span *ngIf="column.sortable" class="sort-indicator">
                <i [class]="getSortIcon(column.key)"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of paginatedData; let i = index" 
              [class]="i % 2 === 0 ? 'row-white' : 'row-blue'">
            <td *ngFor="let column of columns">
              <ng-container [ngSwitch]="column.type">
                <span *ngSwitchCase="'currency'">
                  {{ getColumnValue(item, column.key) | currency:'KSH':'symbol':'1.0-0' }}
                </span>
                <span *ngSwitchCase="'date'">
                  {{ getColumnValue(item, column.key) | date:'dd/MM/yyyy' }}
                </span>
                <span *ngSwitchCase="'status'" 
                      class="status-badge" 
                      [class]="'status-' + getColumnValue(item, column.key).toLowerCase().replace(' ', '-')">
                  {{ getColumnValue(item, column.key) }}
                </span>
                <div *ngSwitchCase="'actions'" class="action-buttons">
                  <button *ngFor="let action of getVisibleActions(item)"
                          class="action-btn"
                          [class]="action.class"
                          (click)="onActionClick(action, item)">
                    <img *ngIf="action.icon" [src]="action.icon" [alt]="action.label" width="16" height="16" />
                    {{ action.label }}
                  </button>
                </div>
                <span *ngSwitchDefault>{{ getColumnValue(item, column.key) }}</span>
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="mobile-cards show-mobile" *ngIf="!loading">
      <div class="data-card" *ngFor="let item of paginatedData">
        <ng-container *ngTemplateOutlet="mobileCardTemplate; context: { $implicit: item, actions: getVisibleActions(item) }"></ng-container>
      </div>
    </div>

    <!-- Pagination -->
    <app-advanced-pagination 
      *ngIf="pagination.enabled && !loading"
      [totalItems]="filteredData.length"
      [currentPage]="currentPage"
      [pageSize]="pagination.pageSize"
      [pageSizeOptions]="pagination.pageSizeOptions"
      [showInfo]="pagination.showInfo"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)">
    </app-advanced-pagination>

    <!-- Empty State -->
    <div *ngIf="!loading && data.length === 0" class="empty-state">
      <div class="empty-icon">📄</div>
      <h3>No data available</h3>
      <p>{{ emptyMessage }}</p>
    </div>
  `,
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: ActionButton[] = [];
  @Input() mobileCardTemplate!: TemplateRef<any>;
  @Input() loading = false;
  @Input() searchTerm = '';
  @Input() emptyMessage = 'No items found';
  @Input() pagination: PaginationConfig = {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showInfo: true
  };

  @Output() actionClick = new EventEmitter<{action: string, item: any}>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  private destroy$ = new Subject<void>();
  
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredData: any[] = [];

  ngOnInit() {
    this.updateFilteredData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges() {
    this.updateFilteredData();
  }

  private updateFilteredData() {
    this.filteredData = this.data.filter(item => {
      if (!this.searchTerm) return true;
      
      return this.columns.some(column => {
        const value = this.getColumnValue(item, column.key);
        return value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    });

    if (this.sortColumn) {
      this.applySorting();
    }
  }

  get paginatedData() {
    if (!this.pagination.enabled) return this.filteredData;
    
    const startIndex = (this.currentPage - 1) * this.pagination.pageSize;
    const endIndex = startIndex + this.pagination.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  getColumnValue(item: any, key: string): any {
    return key.split('.').reduce((obj, prop) => obj?.[prop], item);
  }

  getVisibleActions(item: any): ActionButton[] {
    return this.actions.filter(action => 
      !action.visible || action.visible(item)
    );
  }

  onActionClick(action: ActionButton, item: any) {
    this.actionClick.emit({ action: action.action, item });
  }

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.applySorting();
    this.sortChange.emit({ column: column.key, direction: this.sortDirection });
  }

  private applySorting() {
    this.filteredData.sort((a, b) => {
      const aValue = this.getColumnValue(a, this.sortColumn);
      const bValue = this.getColumnValue(b, this.sortColumn);

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }

  getSortIcon(columnKey: string): string {
    if (this.sortColumn !== columnKey) return 'sort-icon';
    return this.sortDirection === 'asc' ? 'sort-icon sort-asc' : 'sort-icon sort-desc';
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onPageSizeChange(pageSize: number) {
    this.pagination.pageSize = pageSize;
    this.currentPage = 1;
  }
}