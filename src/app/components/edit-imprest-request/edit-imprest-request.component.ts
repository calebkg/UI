import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface SupportingFile {
  name: string;
  size: string;
  type: 'pdf' | 'png' | 'jpg' | 'doc';
}

@Component({
  selector: 'app-edit-imprest-request',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './edit-imprest-request.component.html',
  styleUrls: ['./edit-imprest-request.component.scss']
})
export class EditImprestRequestComponent {
  requestId: string = '';
  
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
    employeeNumber: 'IMP_019',
    mpesaNumber: '0798354209',
    mpesaRegName: 'Nina Marley',
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
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.requestId = this.route.snapshot.params['id'];
  }
  
  removeFile(file: SupportingFile) {
    const index = this.supportingFiles.indexOf(file);
    if (index > -1) {
      this.supportingFiles.splice(index, 1);
    }
  }
  
  submitEditRequest() {
    console.log('Submitting edited imprest request:', this.editRequest);
    console.log('Supporting files:', this.supportingFiles);
    this.router.navigate(['/travel-authorization']);
  }
  
  cancel() {
    this.router.navigate(['/travel-authorization']);
  }
}