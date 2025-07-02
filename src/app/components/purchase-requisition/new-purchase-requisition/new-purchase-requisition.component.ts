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
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './new-purchase-requisition.component.html',
  styleUrls: ['./new-purchase-requisition.component.scss']
})
export class NewPurchaseRequisitionComponent {
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
  triggerFileUpload() {}
  submitNewRequest() {}
  cancel() { this.router.navigate(['/purchase-requisition']); }
} 