import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { DataService } from '../../services/data.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-new-activity-request',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-activity-request.component.html',
  styleUrls: ['./new-activity-request.component.scss']
})
export class NewActivityRequestComponent {
  currentUser: any;
  
  newRequest = {
    employeeName: '',
    employeeNumber: '',
    employeeEmail: '',
    projectCode: '',
    fundingSource: '',
    programArea: '',
    activity: '',
    county: '',
    site: '',
    startDate: '',
    endDate: '',
    currency: 'Ksh.',
    amount: null,
    description: ''
  };
  
  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    // Get current user data
    this.currentUser = this.dataService.getCurrentUser();
    this.newRequest.employeeName = this.currentUser.name;
    this.newRequest.employeeNumber = this.currentUser.employeeNumber;
    this.newRequest.employeeEmail = this.currentUser.email;
  }
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitNewRequest() {
    if (this.validateRequest()) {
      // Generate request number
      const requestNo = `AR_${String(Date.now()).slice(-4)}`;
      
      // Create the activity request
      const activityRequest = {
        no: requestNo,
        documentDate: new Date().toLocaleDateString('en-GB'),
        currency: this.newRequest.currency,
        amount: this.newRequest.amount || 0,
        dateFrom: this.newRequest.startDate,
        dateTo: this.newRequest.endDate,
        description: this.newRequest.description,
        approvalComments: 'Pending approval',
        status: 'Open',
        editable: false
      };
      
      // Add to service
      this.dataService.addActivityRequest(activityRequest);
      
      // Navigate back to activity requests
      this.router.navigate(['/activity-requests']);
    }
  }
  
  validateRequest(): boolean {
    if (!this.newRequest.amount || this.newRequest.amount <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    if (!this.newRequest.startDate || !this.newRequest.endDate) {
      alert('Please select start and end dates');
      return false;
    }
    if (!this.newRequest.description.trim()) {
      alert('Please enter a description');
      return false;
    }
    return true;
  }
  
  cancel() {
    this.router.navigate(['/activity-requests']);
  }
}