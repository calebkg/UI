import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../shared/header/header';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-activity-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Sidebar, Footer, DecimalPipe],
  templateUrl: './activity-requests.html',
  styleUrl: './activity-requests.scss'
})
export class ActivityRequests {
  sidebarOpen = false;
  searchTerm = '';
  paginatedRequests = [];
  totalPages = 1;
  currentPage = 1;

  editRequest(request: any) {}
  saveRequest(request: any) {}
  cancelEdit(request: any) {}
  navigateToNewActivity() {}
  getVisiblePages() { return [1]; }
  goToPage(page: number) {}
}
