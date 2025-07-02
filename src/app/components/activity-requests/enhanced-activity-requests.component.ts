import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DataTableComponent, TableColumn, ActionButton } from '../shared/data-table/data-table.component';
import { SearchFilterComponent, FilterOption } from '../shared/search-filter/search-filter.component';
import { EnhancedDataService, ActivityRequest } from '../../services/enhanced-data.service';

@Component({
  selector: 'app-enhanced-activity-requests',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    SidebarComponent, 
    HeaderComponent, 
    FooterComponent,
    DataTableComponent,
    SearchFilterComponent
  ],
  template: `
    <div class="activity-container">
      <app-sidebar [sidebarType]="'finance'" [(open)]="sidebarOpen"></app-sidebar>
      
      <div class="main-content">
        <app-header 
          title="Financial Services" 
          subtitle="Finance Services/Activity Requests"
          headerClass="finance"
          [showBackButton]="false"
          [(sidebarOpen)]="sidebarOpen">
        </app-header>
        
        <div class="activity-content">
          <div class="activity-section">
            <div class="section-header">
              <div class="section-title">
                <h2>ACTIVITY REQUEST HISTORY</h2>
                <div class="section-stats">
                  <span class="stat-item">Total: {{ totalRequests }}</span>
                  <span class="stat-item">Pending: {{ pendingRequests }}</span>
                  <span class="stat-item">Approved: {{ approvedRequests }}</span>
                </div>
              </div>
              <div class="header-actions">
                <button class="btn btn-secondary export-btn" (click)="exportData()">
                  📊 Export
                </button>
                <button class="btn btn-primary add-new-btn" (click)="navigateToNewActivity()">
                  <img src="assets/Add.svg" alt="Add" width="24" height="24" />
                  ADD NEW ACTIVITY REQUEST
                </button>
              </div>
            </div>
            
            <!-- Enhanced Search and Filters -->
            <app-search-filter
              [searchPlaceholder]="'Search requests...'"
              [filterOptions]="filterOptions"
              [quickFilters]="quickFilters"
              (searchChange)="onSearchChange($event)"
              (filterChange)="onFilterChange($event)"
              (quickFilterChange)="onQuickFilterChange($event)">
            </app-search-filter>
            
            <!-- Enhanced Data Table -->
            <app-data-table
              [data]="activityRequests"
              [columns]="tableColumns"
              [actions]="tableActions"
              [mobileCardTemplate]="mobileCardTemplate"
              [loading]="loading"
              [searchTerm]="searchTerm"
              [emptyMessage]="'No activity requests found'"
              [pagination]="paginationConfig"
              (actionClick)="onActionClick($event)"
              (sortChange)="onSortChange($event)">
            </app-data-table>
            
            <!-- Mobile Card Template -->
            <ng-template #mobileCardTemplate let-item let-actions="actions">
              <div class="request-card">
                <div class="card-header">
                  <span class="card-number">{{ item.no }}</span>
                  <span class="status-badge" [class]="'status-' + item.status.toLowerCase()">
                    {{ item.status }}
                  </span>
                </div>
                <div class="card-body">
                  <div class="card-row">
                    <span class="card-label">Amount:</span>
                    <span class="card-value">{{ item.currency }} {{ item.amount | number:'1.0-0' }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">Period:</span>
                    <span class="card-value">{{ item.dateFrom }} - {{ item.dateTo }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">Description:</span>
                    <span class="card-value">{{ item.description }}</span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">Comments:</span>
                    <span class="card-value">{{ item.approvalComments }}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <button *ngFor="let action of actions"
                          class="action-btn mobile"
                          [class]="action.class"
                          (click)="onActionClick({action: action.action, item: item})">
                    <img *ngIf="action.icon" [src]="action.icon" [alt]="action.label" width="16" height="16" />
                    {{ action.label }}
                  </button>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
        
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styleUrls: ['./enhanced-activity-requests.component.scss']
})
export class EnhancedActivityRequestsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  sidebarOpen = false;
  loading = false;
  searchTerm = '';
  currentFilters: any = {};
  
  activityRequests: ActivityRequest[] = [];
  totalRequests = 0;
  pendingRequests = 0;
  approvedRequests = 0;

  tableColumns: TableColumn[] = [
    { key: 'no', header: 'No.', sortable: true, width: '100px' },
    { key: 'documentDate', header: 'Document Date', sortable: true, type: 'date' },
    { key: 'currency', header: 'Currency', width: '80px' },
    { key: 'amount', header: 'Amount', sortable: true, type: 'currency' },
    { key: 'dateFrom', header: 'Date From', type: 'date' },
    { key: 'dateTo', header: 'Date To', type: 'date' },
    { key: 'description', header: 'Description', width: '200px' },
    { key: 'approvalComments', header: 'Approval Comments', width: '150px' },
    { key: 'status', header: 'Status', type: 'status', width: '100px' },
    { key: 'actions', header: 'Actions', type: 'actions', width: '120px' }
  ];

  tableActions: ActionButton[] = [
    {
      label: 'EDIT',
      icon: 'assets/editlogo.svg',
      action: 'edit',
      class: 'edit-btn',
      visible: (item) => item.status !== 'Approved'
    },
    {
      label: 'VIEW',
      icon: 'assets/view.svg',
      action: 'view',
      class: 'view-btn'
    },
    {
      label: 'DELETE',
      icon: 'assets/delete.svg',
      action: 'delete',
      class: 'delete-btn',
      visible: (item) => item.status === 'Draft'
    }
  ];

  filterOptions: FilterOption[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Open', label: 'Open' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Draft', label: 'Draft' }
      ]
    },
    {
      key: 'currency',
      label: 'Currency',
      type: 'select',
      options: [
        { value: 'Ksh.', label: 'KSH' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' }
      ]
    },
    {
      key: 'amount',
      label: 'Minimum Amount',
      type: 'number',
      placeholder: 'Enter minimum amount'
    },
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'dateRange'
    }
  ];

  quickFilters = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'Open' },
    { label: 'Approved', value: 'Approved' },
    { label: 'This Month', value: 'thisMonth' }
  ];

  paginationConfig = {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showInfo: true
  };

  constructor(
    private router: Router,
    private enhancedDataService: EnhancedDataService
  ) {}

  ngOnInit() {
    this.loadActivityRequests();
    this.loadStatistics();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadActivityRequests() {
    this.loading = true;
    
    const params = {
      search: this.searchTerm,
      ...this.currentFilters
    };

    this.enhancedDataService.getActivityRequests(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.activityRequests = response.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  private loadStatistics() {
    this.enhancedDataService.activityRequests$
      .pipe(takeUntil(this.destroy$))
      .subscribe(requests => {
        this.totalRequests = requests.length;
        this.pendingRequests = requests.filter(r => r.status === 'Open').length;
        this.approvedRequests = requests.filter(r => r.status === 'Approved').length;
      });
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadActivityRequests();
  }

  onFilterChange(filters: any) {
    this.currentFilters = filters;
    this.loadActivityRequests();
  }

  onQuickFilterChange(filterValue: any) {
    if (filterValue === 'thisMonth') {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      this.currentFilters = {
        dateRange_from: firstDay.toISOString().split('T')[0],
        dateRange_to: lastDay.toISOString().split('T')[0]
      };
    } else if (filterValue) {
      this.currentFilters = { status: filterValue };
    } else {
      this.currentFilters = {};
    }
    
    this.loadActivityRequests();
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }) {
    this.currentFilters = {
      ...this.currentFilters,
      sortBy: sort.column,
      sortOrder: sort.direction
    };
    this.loadActivityRequests();
  }

  onActionClick(event: { action: string; item: ActivityRequest }) {
    switch (event.action) {
      case 'edit':
        this.editRequest(event.item);
        break;
      case 'view':
        this.viewRequest(event.item);
        break;
      case 'delete':
        this.deleteRequest(event.item);
        break;
    }
  }

  navigateToNewActivity() {
    this.router.navigate(['/new-activity-request']);
  }

  editRequest(request: ActivityRequest) {
    this.router.navigate(['/edit-activity-request', request.id]);
  }

  viewRequest(request: ActivityRequest) {
    // Navigate to view page or open modal
    console.log('View request:', request);
  }

  deleteRequest(request: ActivityRequest) {
    if (confirm('Are you sure you want to delete this request?')) {
      this.enhancedDataService.deleteActivityRequest(request.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loadActivityRequests();
          this.loadStatistics();
        });
    }
  }

  exportData() {
    this.enhancedDataService.exportData('activity_requests', 'csv')
      .pipe(takeUntil(this.destroy$))
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `activity-requests-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }
}