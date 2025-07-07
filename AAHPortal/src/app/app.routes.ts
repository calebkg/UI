import { Routes } from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileFormComponent },
  { path: 'vacancies', component: VacanciesComponent },
  { path: 'applications', component: MyApplicationsComponent },
  { path: 'apply/:id', component: ApplicationFormComponent },
  { path: 'profile-summary', component: ProfileFormComponent },
  { path: 'edit-profile', component: ProfileFormComponent },
];
