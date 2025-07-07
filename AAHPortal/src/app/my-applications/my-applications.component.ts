import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Application {
  id: number;
  applicationNo: string;
  jobTitle: string;
  currentSalary: number;
  expectedSalary: number;
  noticePeriod: string;
  status: string;
}

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent {
  searchTerm = '';
  
  applications: Application[] = [
    { id: 1, applicationNo: 'JREQ00115', jobTitle: 'Software Engineer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 2, applicationNo: 'JREQ00115', jobTitle: 'Data Analyst', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 3, applicationNo: 'JREQ00115', jobTitle: 'Receptionist', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 4, applicationNo: 'JREQ00115', jobTitle: 'Designer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 5, applicationNo: 'JREQ00115', jobTitle: 'Software Engineer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 6, applicationNo: 'JREQ00115', jobTitle: 'Developer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 7, applicationNo: 'JREQ00115', jobTitle: 'Software Engineer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 8, applicationNo: 'JREQ00115', jobTitle: 'Software Engineer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 9, applicationNo: 'JREQ00115', jobTitle: 'Software Engineer', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' },
    { id: 10, applicationNo: 'JREQ00115', jobTitle: 'Data Clerk', currentSalary: 40000, expectedSalary: 50000, noticePeriod: '1 MONTH(S)', status: 'Submitted' }
  ];
  
  get filteredApplications() {
    if (!this.searchTerm) {
      return this.applications;
    }
    
    return this.applications.filter(app => 
      app.jobTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.applicationNo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}