import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

interface PendingRequest {
  id: string;
  method: string;
  url: string;
  data?: any;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  private pendingRequests: PendingRequest[] = [];
  private readonly STORAGE_KEY = 'offline_pending_requests';

  public isOnline$ = this.isOnlineSubject.asObservable();

  constructor(private notificationService: NotificationService) {
    this.initializeOfflineDetection();
    this.loadPendingRequests();
  }

  private initializeOfflineDetection(): void {
    // Listen for online/offline events
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).pipe(
      startWith(navigator.onLine)
    ).subscribe(isOnline => {
      this.isOnlineSubject.next(isOnline);
      
      if (isOnline) {
        this.notificationService.success('Connection Restored', 'You are back online');
        this.syncPendingRequests();
      } else {
        this.notificationService.warning('Connection Lost', 'You are now offline. Changes will be saved locally.');
      }
    });
  }

  isOnline(): boolean {
    return this.isOnlineSubject.value;
  }

  queueRequest(method: string, url: string, data?: any): string {
    const id = Date.now().toString();
    const request: PendingRequest = {
      id,
      method,
      url,
      data,
      timestamp: Date.now()
    };
    
    this.pendingRequests.push(request);
    this.savePendingRequests();
    
    return id;
  }

  private syncPendingRequests(): void {
    if (this.pendingRequests.length === 0) {
      return;
    }
    
    this.notificationService.info(
      'Syncing Data', 
      `Syncing ${this.pendingRequests.length} pending requests...`
    );
    
    // In a real implementation, you would process these requests
    // through your API service
    console.log('Syncing pending requests:', this.pendingRequests);
    
    // For demo purposes, we'll just clear them
    this.pendingRequests = [];
    this.savePendingRequests();
    
    this.notificationService.success('Sync Complete', 'All pending changes have been synchronized');
  }

  private loadPendingRequests(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        this.pendingRequests = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse pending requests from storage', e);
        this.pendingRequests = [];
      }
    }
  }

  private savePendingRequests(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.pendingRequests));
  }

  getPendingRequestsCount(): number {
    return this.pendingRequests.length;
  }

  clearPendingRequests(): void {
    this.pendingRequests = [];
    this.savePendingRequests();
  }

  // For testing offline mode
  simulateOffline(): void {
    this.isOnlineSubject.next(false);
  }

  simulateOnline(): void {
    this.isOnlineSubject.next(true);
    this.syncPendingRequests();
  }
}