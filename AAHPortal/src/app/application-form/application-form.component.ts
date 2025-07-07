import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Document {
  type: string;
  name: string;
}

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent {
  jobTitle = 'Software Engineering';
  currentSalary = '';
  expectedSalary = '';
  noticePeriod = '2';
  
  selectedDocumentType = '';
  documentTypes = [
    'Cover letter',
    'Curriculum Vitae',
    'Passport',
    'Academic Certificate',
    'National ID',
    'Training Certificate'
  ];
  
  uploadedDocuments: Document[] = [
    { type: 'Cover letter', name: 'Cover Letter.PDF' },
    { type: 'Curriculum Vitae', name: 'CV.PDF' },
    { type: 'Passport', name: 'Passport.PNG' },
    { type: 'Academic Certificate', name: 'Certificate.PDF' },
    { type: 'National ID', name: 'ID.PDF' },
    { type: 'Training Certificate', name: 'Training.PDF' }
  ];
  
  uploadedFiles: string[] = [
    'Cover Letter.PDF',
    'Passport.PNG'
  ];
  
  invalidFile = 'document.name.DOC';
  
  uploadFiles() {
    console.log('Uploading files');
  }
  
  removeFile(file: string) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }
  
  viewDocument(document: Document) {
    console.log('Viewing document:', document);
  }
  
  deleteDocument(document: Document) {
    this.uploadedDocuments = this.uploadedDocuments.filter(d => d !== document);
  }
  
  submitApplication() {
    console.log('Submitting application');
  }
}