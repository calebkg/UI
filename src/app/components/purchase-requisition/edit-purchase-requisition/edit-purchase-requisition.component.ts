import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-edit-purchase-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './edit-purchase-requisition.component.html',
  styleUrls: ['./edit-purchase-requisition.component.scss']
})
export class EditPurchaseRequisitionComponent {
  editRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    purpose: ''
  };
  constructor(private route: ActivatedRoute, private router: Router) {
    // You can fetch the requisition by id here using route.snapshot.params['id']
  }
  triggerFileUpload() {}
  submitEditRequest() {}
  cancel() { this.router.navigate(['/purchase-requisition']); }
} 