import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-view-leave-application',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './view-leave-application.component.html',
  styleUrls: ['./view-leave-application.component.scss']
})
export class ViewLeaveApplicationComponent implements OnInit {
  applicationId: string = '';
  sidebarOpen = false;
  
  application = {
    employeeName: 'Nina Marley',
    employeeNumber: 'IMP-129',
    leaveType: 'Annual Leave Grade 8',
    startDate: '6/6/2025',
    endDate: '12/6/2025',
    returnDate: '6/6/2025',
    appliedDays: '10 Days',
    reason: 'Compulsory Annual Leave'
  };
  
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.applicationId = this.route.snapshot.params['id'];
    // In a real app, we would fetch the application data from the service
    // For now, we'll use the mock data already in the component
  }
  
  cancel() {
    this.router.navigate(['/hr-services']);
  }
}