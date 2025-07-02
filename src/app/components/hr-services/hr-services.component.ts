import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface LeaveApplication {
  id: string;
  no: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  appliedDays: number;
  approvedDays: number;
  approvalComments: string;
  status: string;
}

@Component({
  selector: 'app-hr-services',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './hr-services.component.html',
  styleUrls: ['./hr-services.component.scss']
})
export class HrServicesComponent {
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  
  leaveApplications: LeaveApplication[] = [
    {
      id: '1',
      no: 'LV-250',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '2',
      no: 'LV-251',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '3',
      no: 'LV-252',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '4',
      no: 'LV-253',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '5',
      no: 'LV-254',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '6',
      no: 'LV-255',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '7',
      no: 'LV-256',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '8',
      no: 'LV-257',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '9',
      no: 'LV-258',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    },
    {
      id: '10',
      no: 'LV-259',
      leaveType: 'ANNUAL LEAVE GRADE 8',
      startDate: '15/5/2025',
      endDate: '20/5/2025',
      appliedDays: 8,
      approvedDays: 7,
      approvalComments: 'Leave Granted',
      status: 'Leave Granted'
    }
  ];
  
  constructor(private router: Router) {}
  
  get filteredApplications() {
    if (!this.searchTerm) {
      return this.leaveApplications;
    }
    return this.leaveApplications.filter(application =>
      Object.values(application).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  
  get totalPages() {
    return Math.ceil(this.filteredApplications.length / this.itemsPerPage);
  }
  
  get paginatedApplications() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredApplications.slice(startIndex, endIndex);
  }
  
  navigateToNewLeave() {
    this.router.navigate(['/new-leave-application']);
  }
  
  editApplication(application: LeaveApplication) {
    console.log('Edit application:', application);
  }
  
  viewApplication(application: LeaveApplication) {
    this.router.navigate(['/view-leave-application', application.id]);
  }
  
  viewApprovers(application: LeaveApplication) {
    console.log('View approvers for:', application);
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
}