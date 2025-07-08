import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../shared/footer/footer.component';

interface PersonalInfo {
  firstName: string;
  middleName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

interface ContactInfo {
  phoneNumber: string;
  alternativePhone: string;
  postalCode: string;
  postalAddress: string;
  physicalLocation: string;
  street: string;
}

interface AcademicHistory {
  institution: string;
  qualification: string;
  course: string;
  specialisation: string;
  award: string;
  awardDate: string;
}

interface WorkExperience {
  employer: string;
  jobDesignation: string;
  dateFrom: string;
  dateTo: string;
}

interface Referee {
  initials: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  occupation: string;
}

@Component({
  selector: 'app-profile-summary',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './profile-summary.html',
  styleUrls: ['./profile-summary.scss']
})
export class ProfileSummaryComponent implements OnInit {

  personalInfo: PersonalInfo = {
    firstName: 'Brianna',
    middleName: 'Malina',
    email: 'Kirui',
    dateOfBirth: '20/06/1999',
    gender: 'Male',
    nationality: 'Kenyan'
  };

  contactInfo: ContactInfo = {
    phoneNumber: '0704237858',
    alternativePhone: '0785628357',
    postalCode: '00100',
    postalAddress: 'Nairobi',
    physicalLocation: 'Westlands',
    street: 'Woodvale'
  };

  academicHistory: AcademicHistory[] = [
    {
      institution: 'UON',
      qualification: 'Degree',
      course: 'Information Technology',
      specialisation: 'Software Engineering',
      award: 'Second Class',
      awardDate: '11/07/23'
    },
    {
      institution: 'TUK',
      qualification: 'Diploma',
      course: 'Information Technology',
      specialisation: 'Software Engineering',
      award: 'First Class',
      awardDate: '11/07/23'
    },
    {
      institution: 'UON',
      qualification: 'Degree',
      course: 'Information Technology',
      specialisation: 'Software Engineering',
      award: 'Second Class',
      awardDate: '11/07/23'
    }
  ];

  workExperience: WorkExperience[] = [
    {
      employer: 'Systra',
      jobDesignation: 'software developer',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employer: 'Systra',
      jobDesignation: 'Software engineer intern',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employer: 'Systra',
      jobDesignation: 'software developer',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    },
    {
      employer: 'Systra',
      jobDesignation: 'Software engineer intern',
      dateFrom: '11/07/23',
      dateTo: '11/07/23'
    }
  ];

  referees: Referee[] = [
    {
      initials: 'Mr.',
      fullName: 'Davis Decco',
      mobileNumber: '0731856507',
      email: 'decco54@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Decco',
      mobileNumber: '0731856507',
      email: 'decco54@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Decco',
      mobileNumber: '0731856507',
      email: 'decco54@gmail.com',
      occupation: 'software developer'
    },
    {
      initials: 'Mr.',
      fullName: 'Davis Decco',
      mobileNumber: '0731856507',
      email: 'decco54@gmail.com',
      occupation: 'software developer'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize component or load data from service
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
