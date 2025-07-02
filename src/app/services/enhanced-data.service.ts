import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { LoadingService } from './loading.service';

export interface User {
  id: string;
  name: string;
  email: string;
  employeeNumber: string;
  avatar: string;
  role: string;
  department: string;
  permissions: string[];
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EnhancedDataService {
  private currentUserSubject = new BehaviorSubject<User>({
    id: '1',
    name: 'Esther Waithii',
    email: 'technical@ware.co.ke',
    employeeNumber: 'EMP_010',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    role: 'employee',
    department: 'IT',
    permissions: ['activity_requests.view', 'activity_requests.create', 'leave_applications.view']
  });

  private activityRequestsSubject = new BehaviorSubject<ActivityRequest[]>([]);
  private leaveApplicationsSubject = new BehaviorSubject<LeaveApplication[]>([]);
  private cacheMap = new Map<string, { data: any; timestamp: number; ttl: number }>();

  constructor(
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {
    this.initializeMockData();
  }

  // User Management
  get currentUser$(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this.simulateApiCall(() => {
      const currentUser = this.currentUserSubject.value;
      const updatedUser = { ...currentUser, ...user };
      this.currentUserSubject.next(updatedUser);
      this.notificationService.success('Success', 'Profile updated successfully');
      return updatedUser;
    });
  }

  // Activity Requests
  get activityRequests$(): Observable<ActivityRequest[]> {
    return this.activityRequestsSubject.asObservable();
  }

  getActivityRequests(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Observable<ApiResponse<ActivityRequest[]>> {
    const cacheKey = `activity_requests_${JSON.stringify(params)}`;
    const cached = this.getFromCache<ActivityRequest[]>(cacheKey);
    
    if (cached) {
      return of({ data: cached, success: true });
    }

    return this.simulateApiCall(() => {
      let data = this.activityRequestsSubject.value;
      
      // Apply search filter
      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        data = data.filter(item => 
          Object.values(item).some(value => 
            value?.toString().toLowerCase().includes(searchTerm)
          )
        );
      }
      
      // Apply status filter
      if (params?.status) {
        data = data.filter(item => item.status === params.status);
      }
      
      // Apply sorting
      if (params?.sortBy) {
        data.sort((a, b) => {
          const aValue = (a as any)[params.sortBy!];
          const bValue = (b as any)[params.sortBy!];
          const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          return params.sortOrder === 'desc' ? -comparison : comparison;
        });
      }
      
      // Apply pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const paginatedData = data.slice(startIndex, startIndex + limit);
      
      this.setCache(cacheKey, paginatedData, 300000); // 5 minutes cache
      
      return {
        data: paginatedData,
        success: true,
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit)
        }
      };
    });
  }

  createActivityRequest(request: Omit<ActivityRequest, 'id' | 'createdAt' | 'updatedAt'>): Observable<ActivityRequest> {
    return this.simulateApiCall(() => {
      const newRequest: ActivityRequest = {
        ...request,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const current = this.activityRequestsSubject.value;
      this.activityRequestsSubject.next([...current, newRequest]);
      this.clearCache('activity_requests');
      this.notificationService.success('Success', 'Activity request created successfully');
      
      return newRequest;
    });
  }

  updateActivityRequest(id: string, updates: Partial<ActivityRequest>): Observable<ActivityRequest> {
    return this.simulateApiCall(() => {
      const current = this.activityRequestsSubject.value;
      const index = current.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error('Activity request not found');
      }
      
      const updatedRequest = {
        ...current[index],
        ...updates,
        updatedAt: new Date()
      };
      
      current[index] = updatedRequest;
      this.activityRequestsSubject.next([...current]);
      this.clearCache('activity_requests');
      this.notificationService.success('Success', 'Activity request updated successfully');
      
      return updatedRequest;
    });
  }

  deleteActivityRequest(id: string): Observable<boolean> {
    return this.simulateApiCall(() => {
      const current = this.activityRequestsSubject.value;
      const filtered = current.filter(item => item.id !== id);
      this.activityRequestsSubject.next(filtered);
      this.clearCache('activity_requests');
      this.notificationService.success('Success', 'Activity request deleted successfully');
      
      return true;
    });
  }

  // Leave Applications
  get leaveApplications$(): Observable<LeaveApplication[]> {
    return this.leaveApplicationsSubject.asObservable();
  }

  getLeaveApplications(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Observable<ApiResponse<LeaveApplication[]>> {
    const cacheKey = `leave_applications_${JSON.stringify(params)}`;
    const cached = this.getFromCache<LeaveApplication[]>(cacheKey);
    
    if (cached) {
      return of({ data: cached, success: true });
    }

    return this.simulateApiCall(() => {
      let data = this.leaveApplicationsSubject.value;
      
      // Apply filters similar to activity requests
      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        data = data.filter(item => 
          Object.values(item).some(value => 
            value?.toString().toLowerCase().includes(searchTerm)
          )
        );
      }
      
      if (params?.status) {
        data = data.filter(item => item.status === params.status);
      }
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const paginatedData = data.slice(startIndex, startIndex + limit);
      
      this.setCache(cacheKey, paginatedData, 300000);
      
      return {
        data: paginatedData,
        success: true,
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: Math.ceil(data.length / limit)
        }
      };
    });
  }

  // Cache Management
  private getFromCache<T>(key: string): T | null {
    const cached = this.cacheMap.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cacheMap.delete(key);
    return null;
  }

  private setCache<T>(key: string, data: T, ttl: number): void {
    this.cacheMap.set(key, { data, timestamp: Date.now(), ttl });
  }

  private clearCache(prefix?: string): void {
    if (prefix) {
      for (const key of this.cacheMap.keys()) {
        if (key.startsWith(prefix)) {
          this.cacheMap.delete(key);
        }
      }
    } else {
      this.cacheMap.clear();
    }
  }

  // Utility Methods
  private simulateApiCall<T>(operation: () => T): Observable<T> {
    this.loadingService.show();
    
    return of(null).pipe(
      delay(Math.random() * 1000 + 500), // Simulate network delay
      map(() => operation()),
      tap(() => this.loadingService.hide()),
      catchError(error => {
        this.loadingService.hide();
        this.notificationService.error('Error', error.message || 'An error occurred');
        return throwError(error);
      })
    );
  }

  private initializeMockData(): void {
    // Initialize with sample data
    const sampleRequests: ActivityRequest[] = [
      {
        id: '1',
        no: 'AR_0031',
        documentDate: '10/5/2025',
        currency: 'Ksh.',
        amount: 16000,
        dateFrom: '15/5/2025',
        dateTo: '20/5/2025',
        description: 'Corporate Meeting',
        approvalComments: 'Attach email approvals',
        status: 'Open',
        employeeId: '1',
        editable: false,
        createdAt: new Date('2025-01-10'),
        updatedAt: new Date('2025-01-10')
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
        status: 'Approved',
        employeeId: '1',
        editable: false,
        createdAt: new Date('2025-01-12'),
        updatedAt: new Date('2025-01-12')
      }
    ];

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
        employeeId: '1',
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15')
      }
    ];

    this.activityRequestsSubject.next(sampleRequests);
    this.leaveApplicationsSubject.next(sampleApplications);
  }

  // Analytics and Metrics
  getDashboardMetrics(): Observable<any> {
    return this.simulateApiCall(() => {
      const user = this.getCurrentUser();
      const activityRequests = this.activityRequestsSubject.value;
      const leaveApplications = this.leaveApplicationsSubject.value;
      
      return {
        approvedLeaves: leaveApplications.filter(l => l.status === 'Leave Granted' && l.employeeId === user.id).length,
        pendingLeaves: leaveApplications.filter(l => l.status === 'Pending' && l.employeeId === user.id).length,
        approvedTrainings: 3,
        approvedTimesheets: 6,
        appraisals: 10,
        totalRequests: activityRequests.filter(r => r.employeeId === user.id).length,
        totalAmount: activityRequests.reduce((sum, r) => sum + r.amount, 0),
        recentActivity: [
          ...activityRequests.slice(0, 3).map(r => ({ type: 'Activity Request', ...r })),
          ...leaveApplications.slice(0, 2).map(l => ({ type: 'Leave Application', ...l }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      };
    });
  }

  // Bulk Operations
  bulkUpdateActivityRequests(ids: string[], updates: Partial<ActivityRequest>): Observable<ActivityRequest[]> {
    return this.simulateApiCall(() => {
      const current = this.activityRequestsSubject.value;
      const updatedRequests = current.map(request => 
        ids.includes(request.id) 
          ? { ...request, ...updates, updatedAt: new Date() }
          : request
      );
      
      this.activityRequestsSubject.next(updatedRequests);
      this.clearCache('activity_requests');
      this.notificationService.success('Success', `${ids.length} requests updated successfully`);
      
      return updatedRequests.filter(r => ids.includes(r.id));
    });
  }

  // Export functionality
  exportData(type: 'activity_requests' | 'leave_applications', format: 'csv' | 'excel'): Observable<Blob> {
    return this.simulateApiCall(() => {
      const data = type === 'activity_requests' 
        ? this.activityRequestsSubject.value 
        : this.leaveApplicationsSubject.value;
      
      // Convert to CSV format (simplified)
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(item => Object.values(item).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      this.notificationService.success('Success', 'Data exported successfully');
      
      return blob;
    });
  }
}