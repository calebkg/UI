import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-edit-purchase-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './edit-purchase-requisition.component.html',
  styleUrls: ['./edit-purchase-requisition.component.scss']
})
export class EditPurchaseRequisitionComponent implements OnInit {
  sidebarOpen = false;
  editRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    purpose: ''
  };
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // In a real app, we would fetch the requisition by id
    // For now, we'll populate with mock data
    this.editRequest = {
      employeeName: 'John Doe',
      employeeNumber: 'EMP001',
      itemDescription: 'Printer',
      quantity: 2,
      unitPrice: 15000,
      totalPrice: 30000,
      purpose: 'Office use'
    };
  }
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitEditRequest() {
    // Calculate total price
    this.editRequest.totalPrice = this.editRequest.quantity * this.editRequest.unitPrice;
    
    console.log('Submitting edited purchase requisition:', this.editRequest);
    // In a real app, we would update the requisition in the service
    // For now, we'll just navigate back to the purchase requisition page
    this.router.navigate(['/purchase-requisition']);
  }
  
  cancel() { 
    this.router.navigate(['/purchase-requisition']); 
  }
}