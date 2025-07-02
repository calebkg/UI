import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Approver {
  documentNo: string;
  sequenceNo: number;
  approverId: string;
  status: string;
  dateSentForApproval: string;
  time: string;
}

@Component({
  selector: 'app-fund-claim-approvers',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './fund-claim-approvers.component.html',
  styleUrls: ['./fund-claim-approvers.component.scss']
})
export class FundClaimApproversComponent implements OnInit {
  searchTerm = '';
  claimId: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  sidebarOpen = false;
  
  approvers: Approver[] = [
    {
      documentNo: 'FC-24-0331',
      sequenceNo: 2,
      approverId: 'GRACE.KIARAHO',
      status: 'Approved',
      dateSentForApproval: '19/09/24',
      time: '3:20PM'
    },
    {
      documentNo: 'FC-24-0331',
      sequenceNo: 2,
      approverId: 'GRACE.KIARAHO',
      status: 'Approved',
      dateSentForApproval: '19/09/24',
      time: '3:20PM'
    },
    {
      documentNo: 'FC-24-0331',
      sequenceNo: 1,
      approverId: 'KIARAHO.GRACE',
      status: 'Approved',
      dateSentForApproval: '19/09/24',
      time: '3:20PM'
    },
    {
      documentNo: 'FC-24-0331',
      sequenceNo: 1,
      approverId: 'GRACE.KIARAHO',
      status: 'Approved',
      dateSentForApproval: '19/09/24',
      time: '3:20PM'
    },
    {
      documentNo: 'FC-24-0331',
      sequenceNo: 2,
      approverId: 'GRACE.KIARAHO',
      status: 'Approved',
      dateSentForApproval: '19/09/24',
      time: '3:20PM'
    }
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.claimId = this.route.snapshot.params['id'];
    // In a real app, we would fetch the approvers for this claim
    // For now, we'll use the mock data already in the component
  }
  
  get filteredApprovers() {
    if (!this.searchTerm) {
      return this.approvers;
    }
    return this.approvers.filter(approver =>
      Object.values(approver).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  
  get totalPages() {
    return Math.ceil(this.filteredApprovers.length / this.itemsPerPage);
  }
  
  get paginatedApprovers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredApprovers.slice(startIndex, endIndex);
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