import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  employeeNumber: string;
  avatar: string;
}

export interface LeaveBalance {
  leaveType: string;
  balance: number;
}

export interface FinanceData {
  description: string;
  amount: number;
}

export interface ActivityRequest {
  id: string;
  no: string;
  documentDate: string;
  currency: string;
  amount: number;
  dateFrom: string;
  dateTo: string;
  description: string;
  approvalComments: string;
  status: string;
  employeeId: string;
  editable: boolean;
}

export interface LeaveApplication {
  id: string;
  no: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  appliedDays: number;
  approvedDays: number;
  approvalComments: string;
  status: string;
  employeeId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentUserSubject = new BehaviorSubject<User>({
    id: '1',
    name: 'Esther Waithii',
    email: 'technical@ware.co.ke',
    employeeNumber: 'EMP_010',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2'
  });

  private leaveBalancesSubject = new BehaviorSubject<LeaveBalance[]>([
    { leaveType: 'ACCOMPANYING PARENT ON CHILD HOSPITALIZATION', balance: 0.0 },
    { leaveType: 'ANNUAL LEAVE GRADE 8', balance: 10.39 },
    { leaveType: 'COMPASSIONATE LEAVE', balance: 5.0 },
    { leaveType: 'PATERNITY LEAVE', balance: 14.0 },
    { leaveType: 'SICK LEAVE ON FULL PAY', balance: 30.0 },
    { leaveType: 'STUDY LEAVE', balance: 10.0 }
  ]);

  private financeDataSubject = new BehaviorSubject<FinanceData[]>([
    { description: 'IMPREST BALANCE', amount: 5000.0 },
    { description: 'MY APPROVED IMPRESTS', amount: 100000.00 },
    { description: 'MY APPROVED IMPREST SURRENDERS', amount: 14000.00 },
    { description: 'APPROVED EXPENSE CLAIMS', amount: 30000.00 }
  ]);

  private activityRequestsSubject = new BehaviorSubject<ActivityRequest[]>([]);
  private leaveApplicationsSubject = new BehaviorSubject<LeaveApplication[]>([]);

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User data
  get currentUser$(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  // Leave balances
  get leaveBalances$(): Observable<LeaveBalance[]> {
    return this.leaveBalancesSubject.asObservable();
  }

  getLeaveBalances(): LeaveBalance[] {
    return this.leaveBalancesSubject.value;
  }

  updateLeaveBalance(leaveType: string, newBalance: number): void {
    const balances = this.leaveBalancesSubject.value;
    const index = balances.findIndex(b => b.leaveType === leaveType);
    if (index !== -1) {
      balances[index].balance = newBalance;
      this.leaveBalancesSubject.next([...balances]);
    }
  }

  // Finance data
  get financeData$(): Observable<FinanceData[]> {
    return this.financeDataSubject.asObservable();
  }

  getFinanceData(): FinanceData[] {
    return this.financeDataSubject.value;
  }

  updateFinanceData(description: string, amount: number): void {
    const data = this.financeDataSubject.value;
    const index = data.findIndex(d => d.description === description);
    if (index !== -1) {
      data[index].amount = amount;
      this.financeDataSubject.next([...data]);
    }
  }

  // Activity requests
  get activityRequests$(): Observable<ActivityRequest[]> {
    return this.activityRequestsSubject.asObservable();
  }

  getActivityRequests(): ActivityRequest[] {
    return this.activityRequestsSubject.value;
  }

  addActivityRequest(request: Omit<ActivityRequest, 'id' | 'employeeId'>): void {
    const newRequest: ActivityRequest = {
      ...request,
      id: Date.now().toString(),
      employeeId: this.getCurrentUser().id
    };
    const requests = [...this.activityRequestsSubject.value, newRequest];
    this.activityRequestsSubject.next(requests);
    
    // Update finance data when new request is added
    this.updateFinanceData('MY APPROVED IMPRESTS', 
      this.getFinanceData().find(d => d.description === 'MY APPROVED IMPRESTS')!.amount + request.amount);
  }

  updateActivityRequest(id: string, updates: Partial<ActivityRequest>): void {
    const requests = this.activityRequestsSubject.value;
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      this.activityRequestsSubject.next([...requests]);
    }
  }

  deleteActivityRequest(id: string): void {
    const requests = this.activityRequestsSubject.value.filter(r => r.id !== id);
    this.activityRequestsSubject.next(requests);
  }

  // Leave applications
  get leaveApplications$(): Observable<LeaveApplication[]> {
    return this.leaveApplicationsSubject.asObservable();
  }

  getLeaveApplications(): LeaveApplication[] {
    return this.leaveApplicationsSubject.value;
  }

  addLeaveApplication(application: Omit<LeaveApplication, 'id' | 'employeeId'>): void {
    const newApplication: LeaveApplication = {
      ...application,
      id: Date.now().toString(),
      employeeId: this.getCurrentUser().id
    };
    const applications = [...this.leaveApplicationsSubject.value, newApplication];
    this.leaveApplicationsSubject.next(applications);
    
    // Update leave balance when application is approved
    if (application.status === 'Leave Granted') {
      this.updateLeaveBalance(application.leaveType, 
        this.getLeaveBalances().find(b => b.leaveType === application.leaveType)?.balance! - application.approvedDays);
    }
  }

  updateLeaveApplication(id: string, updates: Partial<LeaveApplication>): void {
    const applications = this.leaveApplicationsSubject.value;
    const index = applications.findIndex(a => a.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...updates };
      this.leaveApplicationsSubject.next([...applications]);
    }
  }

  deleteLeaveApplication(id: string): void {
    const applications = this.leaveApplicationsSubject.value.filter(a => a.id !== id);
    this.leaveApplicationsSubject.next(applications);
  }

  // Dashboard metrics
  getDashboardMetrics() {
    const user = this.getCurrentUser();
    const leaveApplications = this.getLeaveApplications();
    const activityRequests = this.getActivityRequests();
    
    return {
      approvedLeaves: leaveApplications.filter(l => l.status === 'Leave Granted' && l.employeeId === user.id).length,
      pendingLeaves: leaveApplications.filter(l => l.status === 'Pending' && l.employeeId === user.id).length,
      approvedTrainings: 3, // Static for now
      approvedTimesheets: 6, // Static for now
      appraisals: 10, // Static for now
      totalRequests: activityRequests.filter(r => r.employeeId === user.id).length
    };
  }

  private initializeSampleData(): void {
    // Initialize with sample activity requests
    const sampleRequests: ActivityRequest[] = [
      {
        id: '1',
        no: 'AR_0031',
        documentDate: '10/5/2025',
        currency: 'Ksh.',
        amount: 16000,
        dateFrom: '15/5/2025',
        dateTo: '20/5/2025',
        description: 'Cooperate Meeting',
        approvalComments: 'Attach email approvals',
        status: 'Open',
        employeeId: '1',
        editable: false
      },
      {
        id: '2',
        no: 'AR_0032',
        documentDate: '12/5/2025',
        currency: 'Ksh.',
        amount: 25000,
        dateFrom: '18/5/2025',
        dateTo: '22/5/2025',
        description: 'Training Workshop',
        approvalComments: 'Approved by manager',
        status: 'Open',
        employeeId: '1',
        editable: false
      }
    ];

    // Initialize with sample leave applications
    const sampleApplications: LeaveApplication[] = [
      {
        id: '1',
        no: 'LV-250',
        leaveType: 'ANNUAL LEAVE GRADE 8',
        startDate: '15/5/2025',
        endDate: '20/5/2025',
        appliedDays: 8,
        approvedDays: 7,
        approvalComments: 'Leave Granted',
        status: 'Leave Granted',
        employeeId: '1'
      },
      {
        id: '2',
        no: 'LV-251',
        leaveType: 'ANNUAL LEAVE GRADE 8',
        startDate: '15/5/2025',
        endDate: '20/5/2025',
        appliedDays: 8,
        approvedDays: 7,
        approvalComments: 'Leave Granted',
        status: 'Leave Granted',
        employeeId: '1'
      }
    ];

    this.activityRequestsSubject.next(sampleRequests);
    this.leaveApplicationsSubject.next(sampleApplications);
  }
}