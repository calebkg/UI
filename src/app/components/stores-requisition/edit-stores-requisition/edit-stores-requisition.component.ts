import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-edit-stores-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './edit-stores-requisition.component.html',
  styleUrls: ['./edit-stores-requisition.component.scss']
})
export class EditStoresRequisitionComponent {
  editRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitOfIssue: '',
    purpose: '',
    notes: ''
  };
  constructor(private route: ActivatedRoute, private router: Router) {
    // You can fetch the requisition by id here using route.snapshot.params['id']
  }
  triggerFileUpload() {}
  submitEditRequest() {}
  cancel() { this.router.navigate(['/stores-requisition']); }
} 