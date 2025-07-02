import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredPermission = route.data['permission'] as string;
    const requiredRole = route.data['role'] as string;

    if (requiredPermission && !this.authService.hasPermission(requiredPermission)) {
      this.notificationService.error('Access Denied', 'You do not have permission to access this page');
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.notificationService.error('Access Denied', 'You do not have the required role to access this page');
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}