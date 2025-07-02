import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';


interface ImprestRequest {
  id: string;
  no: string;
  documentDate: string;
  currency: string;
  amount: number;
  dateFrom: string;
  dateTo: string;
  description: string;
  approvalComments: string;
  status: string;
}

@Component({
  selector: 'app-travel-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './travel-authorization.component.html',
  styleUrls: ['./travel-authorization.component.scss']
})
export class TravelAuthorizationComponent {
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  
  imprestRequests: ImprestRequest[] = [
    {
      id: '1',
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateFrom: '15/5/2025',
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      approvalComments: 'Attach email approvals',
      status: 'Open'
    },
    {
      id: '2',
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateFrom: '15/5/2025',
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      approvalComments: 'Attach email approvals',
      status: 'Open'
    },
    {
      id: '3',
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateFrom: '15/5/2025',
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      approvalComments: 'Attach email approvals',
      status: 'Open'
    },
    {
      id: '4',
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateFrom: '15/5/2025',
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      approvalComments: 'Attach email approvals',
      status: 'Open'
    },
    {
      id: '5',
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateFrom: '15/5/2025',
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      approvalComments: 'Attach email approvals',
      status: 'Open'
    }
  ];
  
  constructor(private router: Router) {}
  
  get filteredRequests() {
    if (!this.searchTerm) {
      return this.imprestRequests;
    }
    return this.imprestRequests.filter(request =>
      Object.values(request).some(value =>
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
  
  navigateToNewImprest() {
    this.router.navigate(['/new-imprest-request']);
  }
  
  editRequest(request: ImprestRequest) {
    this.router.navigate(['/edit-imprest-request', request.id]);
  }
}