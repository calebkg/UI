import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-new-leave-application',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-leave-application.component.html',
  styleUrls: ['./new-leave-application.component.scss']
})
export class NewLeaveApplicationComponent {
  newApplication = {
    employeeName: '',
    employeeNumber: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    appliedDays: '',
    reason: ''
  };
  
  constructor(private router: Router) {}
  
  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  submitApplication() {
    console.log('Submitting leave application:', this.newApplication);
    this.router.navigate(['/hr-services']);
  }
  
  cancel() {
    this.router.navigate(['/hr-services']);
  }
}