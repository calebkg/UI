import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface ImprestLine {
  no: string;
  documentDate: string;
  currency: string;
  amount: number;
  dateTo: string;
  description: string;
  status: string;
}

interface SupportingFile {
  name: string;
  size: string;
  type: 'pdf' | 'png' | 'jpg' | 'doc';
}

@Component({
  selector: 'app-edit-activity-request',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './edit-activity-request.component.html',
  styleUrls: ['./edit-activity-request.component.scss']
})
export class EditActivityRequestComponent {
  showAddLineModal = false;
  requestId: string = '';
  
  imprestLines: ImprestLine[] = [
    {
      no: 'AR_0031',
      documentDate: '10/5/2025',
      currency: 'Ksh.',
      amount: 16000,
      dateTo: '20/5/2025',
      description: 'Cooperate Meeting',
      status: 'Open'
    }
  ];
  
  supportingFiles: SupportingFile[] = [
    {
      name: 'Imprest-Surrender.pdf',
      size: '34 KB of 50 MB',
      type: 'pdf'
    },
    {
      name: 'Imprest-Surrender.png',
      size: '34 KB of 50 MB',
      type: 'png'
    }
  ];
  
  editRequest = {
    employeeName: 'Nina Marley',
    employeeNumber: 'IMP-209',
    employeeEmail: 'ninamarley@gmail.com',
    projectCode: '',
    fundingSource: '',
    programArea: '',
    activity: '',
    county: '',
    site: '',
    startDate: '2025-06-06',
    endDate: '2025-12-06',
    currency: 'Ksh.',
    amount: 50000,
    description: 'Lorem ipsum dolor sit amet consectetur.'
  };
  
  newImprestLine = {
    imprestCode: '',
    unitCost: 0,
    quantity: 0,
    projectCode: '',
    fundingSource: '',
    programArea: '',
    activity: '',
    county: '',
    site: '',
    description: ''
  };
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.requestId = this.route.snapshot.params['id'];
  }
  
  openAddLineModal() {
    this.showAddLineModal = true;
  }
  
  closeAddLineModal() {
    this.showAddLineModal = false;
    this.resetNewImprestLine();
  }
  
  editImprestLine(line: ImprestLine) {
    // Pre-populate the form with existing line data
    this.newImprestLine = {
      imprestCode: 'IMP001',
      unitCost: line.amount,
      quantity: 1,
      projectCode: 'PRJ001',
      fundingSource: 'Internal',
      programArea: 'Health',
      activity: 'Meeting',
      county: 'Nairobi',
      site: 'Site A',
      description: line.description
    };
    this.showAddLineModal = true;
  }
  
  deleteImprestLine(line: ImprestLine) {
    const index = this.imprestLines.indexOf(line);
    if (index > -1) {
      this.imprestLines.splice(index, 1);
    }
  }
  
  addImprestLine() {
    const newLine: ImprestLine = {
      no: `AR_${String(this.imprestLines.length + 1).padStart(4, '0')}`,
      documentDate: new Date().toLocaleDateString('en-GB'),
      currency: 'Ksh.',
      amount: this.newImprestLine.unitCost * this.newImprestLine.quantity,
      dateTo: new Date().toLocaleDateString('en-GB'),
      description: this.newImprestLine.description,
      status: 'Open'
    };
    
    this.imprestLines.push(newLine);
    this.closeAddLineModal();
  }
  
  resetNewImprestLine() {
    this.newImprestLine = {
      imprestCode: '',
      unitCost: 0,
      quantity: 0,
      projectCode: '',
      fundingSource: '',
      programArea: '',
      activity: '',
      county: '',
      site: '',
      description: ''
    };
  }
  
  removeFile(file: SupportingFile) {
    const index = this.supportingFiles.indexOf(file);
    if (index > -1) {
      this.supportingFiles.splice(index, 1);
    }
  }
  
  submitEditRequest() {
    console.log('Submitting edited request:', this.editRequest);
    console.log('Imprest lines:', this.imprestLines);
    console.log('Supporting files:', this.supportingFiles);
    this.router.navigate(['/activity-requests']);
  }
  
  cancel() {
    this.router.navigate(['/activity-requests']);
  }
}