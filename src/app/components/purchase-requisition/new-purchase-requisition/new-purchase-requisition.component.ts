import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-new-purchase-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-purchase-requisition.component.html',
  styleUrls: ['./new-purchase-requisition.component.scss']
})
export class NewPurchaseRequisitionComponent {
  sidebarOpen = false;
  newRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    purpose: ''
  };
  
  constructor(private router: Router) {}
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitNewRequest() {
    console.log('Submitting new purchase requisition:', this.newRequest);
    // Calculate total price
    this.newRequest.totalPrice = this.newRequest.quantity * this.newRequest.unitPrice;
    
    // In a real app, we would save the request to the service
    // For now, we'll just navigate back to the purchase requisition page
    this.router.navigate(['/purchase-requisition']);
  }
  
  cancel() { 
    this.router.navigate(['/purchase-requisition']); 
  }
}