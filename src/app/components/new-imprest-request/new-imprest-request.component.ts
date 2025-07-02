import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-new-imprest-request',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-imprest-request.component.html',
  styleUrls: ['./new-imprest-request.component.scss']
})
export class NewImprestRequestComponent {
  sidebarOpen = false;
  newRequest = {
    employeeName: '',
    employeeNumber: '',
    mpesaNumber: '',
    mpesaRegName: '',
    projectCode: '',
    fundingSource: '',
    programArea: '',
    activity: '',
    county: '',
    site: '',
    startDate: '',
    endDate: '',
    currency: '',
    amount: null,
    description: ''
  };
  
  constructor(private router: Router) {}
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitNewRequest() {
    console.log('Submitting new imprest request:', this.newRequest);
    // In a real app, we would save the request to the service
    // For now, we'll just navigate back to the travel authorization page
    this.router.navigate(['/travel-authorization']);
  }
  
  cancel() {
    this.router.navigate(['/travel-authorization']);
  }
}