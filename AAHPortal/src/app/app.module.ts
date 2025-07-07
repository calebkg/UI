import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { routes } from './app.routes';

import { ProfileFormComponent } from './profile-form/profile-form.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    App,
    ProfileFormComponent,
    VacanciesComponent,
    MyApplicationsComponent,
    ApplicationFormComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }