import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService, ActivityRequest } from '../../services/data.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-activity-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],

  templateUrl: './activity-requests.component.html',
  styleUrls: ['./activity-requests.component.scss']
})
export class ActivityRequestsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  sidebarOpen = false;
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  
  activityRequests: ActivityRequest[] = [];
  
  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Subscribe to activity requests from the service
    this.dataService.activityRequests$
      .pipe(takeUntil(this.destroy$))
      .subscribe(requests => {
        this.activityRequests = requests.map(r => ({ ...r, editable: false }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  get filteredRequests() {
    if (!this.searchTerm) {
      return this.activityRequests;
    }
    return this.activityRequests.filter(request =>
      Object.values(request).some(value =>
        value !== null && value !== undefined && 
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }
  
  get paginatedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRequests.slice(startIndex, endIndex);
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  getVisiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
  
  navigateToNewActivity() {
    this.router.navigate(['/new-activity-request']);
  }
  
  editRequest(request: any) {
    // Navigate to edit page with the request ID
    this.router.navigate(['/edit-activity-request', request.id]);
  }
  
  saveRequest(request: any) {
    // Update the request in the service
    this.dataService.updateActivityRequest(request.id, request);
    request.editable = false;
    delete request.originalData;
  }
  
  cancelEdit(request: any) {
    if (request.originalData) {
      // Restore original data
      Object.assign(request, request.originalData);
      delete request.originalData;
    }
    request.editable = false;
  }
}