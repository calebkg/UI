import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-new-stores-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-stores-requisition.component.html',
  styleUrls: ['./new-stores-requisition.component.scss']
})
export class NewStoresRequisitionComponent {
  sidebarOpen = false;
  newRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitOfIssue: '',
    purpose: '',
    notes: ''
  };
  
  constructor(private router: Router) {}
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitNewRequest() {
    console.log('Submitting new stores requisition:', this.newRequest);
    // In a real app, we would save the request to the service
    // For now, we'll just navigate back to the stores requisition page
    this.router.navigate(['/stores-requisition']);
  }
  
  cancel() { 
    this.router.navigate(['/stores-requisition']); 
  }
}