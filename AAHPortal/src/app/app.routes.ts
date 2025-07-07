import { Routes } from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { VacanciesComponent } from './vacancies/vacancies.component';

export const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileFormComponent },
  { path: 'vacancies', component: VacanciesComponent },
  { path: 'profile-summary', component: ProfileFormComponent },
  { path: 'edit-profile', component: ProfileFormComponent },
  { path: 'applications', component: ProfileFormComponent },
];
