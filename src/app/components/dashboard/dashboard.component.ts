import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DataService, LeaveBalance, FinanceData } from '../../services/data.service';
import { BlinkService } from '../../services/blink-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentUser: any;
  leaveBalances: LeaveBalance[] = [];
  financeData: FinanceData[] = [];
  dashboardMetrics: any;
  blink = false;
  blinkFinance=  false
  private sub!: Subscription;
  sidebarOpen = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private blinkService: BlinkService
  ) {}

  ngOnInit() {
    // Subscribe to user data
    this.dataService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Subscribe to leave balances
    this.dataService.leaveBalances$
      .pipe(takeUntil(this.destroy$))
      .subscribe(balances => {
        this.leaveBalances = balances;
      });

    // Subscribe to finance data
    this.dataService.financeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.financeData = data;
      });

    // Get dashboard metrics
    this.dashboardMetrics = this.dataService.getDashboardMetrics();

      this.sub = this.blinkService.blink$.subscribe(() => {
      this.blink = true;
      
      setTimeout(() => this.blink = false, 1000);
    });
      this.sub = this.blinkService.blink$$.subscribe(() => {
      this.blinkFinance = true;
      setTimeout(() => this.blinkFinance = false, 1000);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sub.unsubscribe();
  }
  
  navigateToFinance() {
    this.router.navigate(['/activity-requests']);
  }
  
  navigateToHR() {
    this.router.navigate(['/hr-services']);
  }
}