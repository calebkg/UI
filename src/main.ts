import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { LoadingComponent } from './app/components/shared/loading/loading.component';
import { NotificationComponent } from './app/components/shared/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NotificationComponent],
  template: `
    <router-outlet></router-outlet>
    <app-loading></app-loading>
    <app-notification></app-notification>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});