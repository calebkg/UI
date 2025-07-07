import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Vacancy {
  requisitionNo: string;
  jobNo: string;
  description: string;
}

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent {
  searchTerm = '';
  
  vacancies: Vacancy[] = [
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'DATA CLERK' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'FINANCE OFFICER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'FINANCE OFFICER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'FINANCE OFFICER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'GRAPHIC DESIGNER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'GRAPHIC DESIGNER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'GRAPHIC DESIGNER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'SOFTWARE ENGINEER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'SOFTWARE ENGINEER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'SOFTWARE ENGINEER' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'RECEPTIONIST' },
    { requisitionNo: 'JREQ00115', jobNo: 'JOB000019', description: 'RECEPTIONIST' }
  ];
  
  constructor(private router: Router) {}
  
  viewVacancy(vacancy: Vacancy) {
    console.log('Viewing vacancy:', vacancy);
    // Navigate to vacancy details page
  }
  
  downloadVacancy(vacancy: Vacancy) {
    console.log('Downloading vacancy details:', vacancy);
    // Download vacancy details
  }
  
  applyForVacancy(vacancy: Vacancy) {
    console.log('Applying for vacancy:', vacancy);
    // Navigate to application form with the job ID
    this.router.navigate(['/apply', vacancy.jobNo]);
  }
  
  get filteredVacancies() {
    if (!this.searchTerm) {
      return this.vacancies;
    }
    
    return this.vacancies.filter(vacancy => 
      vacancy.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      vacancy.requisitionNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      vacancy.jobNo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}