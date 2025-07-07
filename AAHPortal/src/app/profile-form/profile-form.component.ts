import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  currentStep = 1;
  totalSteps = 5;
  
  personalInfo = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    physicalLocation: '',
    postalAddress: '',
    postalCode: '',
    nationality: '',
    mobileNo: '',
    alternativeMobileNo: ''
  };
  
  educationInfo = {
    institutionName: '',
    qualifications: '',
    stateIfHighest: '',
    course: '',
    areaOfSpecialization: '',
    award: '',
    awardDate: ''
  };
  
  academicHistory = [
    { 
      institutionName: 'UON', 
      qualifications: 'Degree', 
      course: 'Information Technology',
      specialization: 'Software Engineering',
      awards: 'Second Class',
      awardDate: '11/07/23'
    },
    { 
      institutionName: 'TUK', 
      qualifications: 'Diploma', 
      course: 'Information Technology',
      specialization: 'Software Engineering',
      awards: 'First Class',
      awardDate: '11/07/23'
    },
    { 
      institutionName: 'UON', 
      qualifications: 'Degree', 
      course: 'Information Technology',
      specialization: 'Software Engineering',
      awards: 'Second Class',
      awardDate: '11/07/23'
    }
  ];
  
  workExperience = [
    {
      employerName: 'Sysre',
      jobDesignation: 'software developer',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employerName: 'Sysre',
      jobDesignation: 'Software engineer intern',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employerName: 'Sysre',
      jobDesignation: 'software developer',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employerName: 'Sysre',
      jobDesignation: 'Software engineer intern',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    }
  ];
  
  refereeInfo = {
    initials: '',
    fullName: '',
    mobileNumber: '',
    email: '',
    occupation: '',
    category: ''
  };
  
  referees = [
    {
      initials: 'Mr.',
      fullName: 'Davis Deco',
      mobileNumber: '0731185057',
      email: 'deco36@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Deco',
      mobileNumber: '0731185057',
      email: 'deco36@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Deco',
      mobileNumber: '0731185057',
      email: 'deco36@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Deco',
      mobileNumber: '0731185057',
      email: 'deco36@gmail.com',
      occupation: 'software developer'
    }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Initialize with sample data for demo
    this.personalInfo = {
      firstName: 'Brianna',
      middleName: 'Maina',
      lastName: 'Kirui',
      email: 'briannakirui@gmail.com',
      gender: 'Female',
      dateOfBirth: '06/06/1999',
      physicalLocation: 'WESTLANDS',
      postalAddress: 'NAIROBI',
      postalCode: '00100',
      nationality: 'Kenyan',
      mobileNo: '0701885049',
      alternativeMobileNo: '0739990932'
    };
  }
  
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }
  
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  saveDetails() {
    console.log('Saving details for step', this.currentStep);
    // In a real app, we would save the data to a service or API
  }
  
  submitDetails() {
    console.log('Submitting all details');
    // In a real app, we would submit all data to an API
    // and navigate to a confirmation page
  }
  
  addEducation() {
    // Add new education entry
    console.log('Adding education entry');
  }
  
  editEducation(index: number) {
    console.log('Editing education at index', index);
  }
  
  deleteEducation(index: number) {
    console.log('Deleting education at index', index);
    // this.academicHistory.splice(index, 1);
  }
  
  addReferee() {
    // Add new referee
    console.log('Adding referee');
  }
  
  editReferee(index: number) {
    console.log('Editing referee at index', index);
  }
  
  deleteReferee(index: number) {
    console.log('Deleting referee at index', index);
    // this.referees.splice(index, 1);
  }
  
  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}