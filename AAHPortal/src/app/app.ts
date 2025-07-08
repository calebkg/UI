import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'AAH Portal';
  pageTitle = '';
  pageSubtitle = '';
  
  constructor(private router: Router) {
    // Track navigation events to ensure proper page loading
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Scroll to top on navigation
      window.scrollTo(0, 0);
      // Set header title/subtitle based on route
      const url = this.router.url;
      switch (true) {
        case url.startsWith('/profile'):
          this.pageTitle = 'PROFILE';
          this.pageSubtitle = 'ADD PERSONAL INFORMATION';
          break;
        case url.startsWith('/vacancies'):
          this.pageTitle = 'VACANCIES';
          this.pageSubtitle = 'APPLY OPEN VACANCIES';
          break;
        case url.startsWith('/applications'):
          this.pageTitle = 'MY APPLICATIONS';
          this.pageSubtitle = 'VIEW APPLICATIONS';
          break;
        case url.startsWith('/profile-summary'):
          this.pageTitle = 'PROFILE SUMMARY';
          this.pageSubtitle = '';
          break;
        default:
          this.pageTitle = 'AAH Portal';
          this.pageSubtitle = '';
      }
    });
  }
}
