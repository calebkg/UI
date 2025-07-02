import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface FundClaim {
  id: string;
  no: string;
  currency: string;
  amount: number;
  project: string;
  description: string;
  approvalComments: string;
  status: string;
}

@Component({
  selector: 'app-fund-claims',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './fund-claims.component.html',
  styleUrls: ['./fund-claims.component.scss']
})
export class FundClaimsComponent {
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  
  fundClaims: FundClaim[] = [
    {
      id: '1',
      no: 'FC-24',
      currency: 'Ksh.',
      amount: 16000,
      project: '22-COR',
      description: 'Envato Website Support - Reimbursement',
      approvalComments: 'Attach email approvals',
      status: 'Posted'
    },
    {
      id: '2',
      no: 'FC-24',
      currency: 'Ksh.',
      amount: 16000,
      project: '22-COR',
      description: 'Envato Website Support - Reimbursement',
      approvalComments: 'Attach email approvals',
      status: 'Posted'
    },
    {
      id: '3',
      no: 'FC-24',
      currency: 'Ksh.',
      amount: 16000,
      project: '22-COR',
      description: 'Envato Website Support - Reimbursement',
      approvalComments: 'Attach email approvals',
      status: 'Posted'
    },
    {
      id: '4',
      no: 'FC-24',
      currency: 'Ksh.',
      amount: 16000,
      project: '22-COR',
      description: 'Envato Website Support - Reimbursement',
      approvalComments: 'Attach email approvals',
      status: 'Posted'
    },
    {
      id: '5',
      no: 'FC-24',
      currency: 'Ksh.',
      amount: 16000,
      project: '22-COR',
      description: 'Envato Website Support - Reimbursement',
      approvalComments: 'Attach email approvals',
      status: 'Posted'
    }
  ];
  
  constructor(private router: Router) {}
  
  get filteredClaims() {
    if (!this.searchTerm) {
      return this.fundClaims;
    }
    return this.fundClaims.filter(claim =>
      Object.values(claim).some(value =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  
  get totalPages() {
    return Math.ceil(this.filteredClaims.length / this.itemsPerPage);
  }
  
  get paginatedClaims() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredClaims.slice(startIndex, endIndex);
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
  
  navigateToNewFundClaim() {
    // This would navigate to a new fund claim form
    console.log('Navigate to new fund claim');
  }
  
  editClaim(claim: FundClaim) {
    // This would navigate to edit fund claim page
    console.log('Edit claim:', claim);
  }
  
  viewApprovers(claim: FundClaim) {
    this.router.navigate(['/fund-claim-approvers', claim.id]);
  }
}