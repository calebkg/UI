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
  triggerFileUpload() {}
  submitNewRequest() {}
  cancel() { this.router.navigate(['/stores-requisition']); }
} 