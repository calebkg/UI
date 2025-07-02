import { Component, OnInit } from '@angular/core';
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
export class EditStoresRequisitionComponent implements OnInit {
  sidebarOpen = false;
  editRequest = {
    employeeName: '',
    employeeNumber: '',
    itemDescription: '',
    quantity: 1,
    unitOfIssue: '',
    purpose: '',
    notes: ''
  };
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // In a real app, we would fetch the requisition by id
    // For now, we'll populate with mock data
    this.editRequest = {
      employeeName: 'Alice Brown',
      employeeNumber: 'EMP003',
      itemDescription: 'Paper',
      quantity: 10,
      unitOfIssue: 'Ream',
      purpose: 'Printing',
      notes: 'Needed for monthly reports'
    };
  }
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitEditRequest() {
    console.log('Submitting edited stores requisition:', this.editRequest);
    // In a real app, we would update the requisition in the service
    // For now, we'll just navigate back to the stores requisition page
    this.router.navigate(['/stores-requisition']);
  }
  
  cancel() { 
    this.router.navigate(['/stores-requisition']); 
  }
}