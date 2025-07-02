import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComponentsComponent } from './components/components/components.component';
import { ActivityRequestsComponent } from './components/activity-requests/activity-requests.component';
import { EnhancedActivityRequestsComponent } from './components/activity-requests/enhanced-activity-requests.component';
import { NewActivityRequestComponent } from './components/new-activity-request/new-activity-request.component';
import { EditActivityRequestComponent } from './components/edit-activity-request/edit-activity-request.component';
import { TravelAuthorizationComponent } from './components/travel-authorization/travel-authorization.component';
import { NewImprestRequestComponent } from './components/new-imprest-request/new-imprest-request.component';
import { EditImprestRequestComponent } from './components/edit-imprest-request/edit-imprest-request.component';
import { FundClaimsComponent } from './components/fund-claims/fund-claims.component';
import { FundClaimApproversComponent } from './components/fund-claim-approvers/fund-claim-approvers.component';
import { HrServicesComponent } from './components/hr-services/hr-services.component';
import { NewLeaveApplicationComponent } from './components/new-leave-application/new-leave-application.component';
import { ViewLeaveApplicationComponent } from './components/view-leave-application/view-leave-application.component';
import { PurchaseRequisitionComponent } from './components/purchase-requisition/purchase-requisition/purchase-requisition.component';
import { StoresRequisitionComponent } from './components/stores-requisition/stores-requisition/stores-requisition.component';
import { NewPurchaseRequisitionComponent } from './components/purchase-requisition/new-purchase-requisition/new-purchase-requisition.component';
import { EditPurchaseRequisitionComponent } from './components/purchase-requisition/edit-purchase-requisition/edit-purchase-requisition.component';
import { NewStoresRequisitionComponent } from './components/stores-requisition/new-stores-requisition/new-stores-requisition.component';
import { EditStoresRequisitionComponent } from './components/stores-requisition/edit-stores-requisition/edit-stores-requisition.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'components', component: ComponentsComponent },
  // Redirect finance-services to activity-requests
  { path: 'finance-services', redirectTo: '/activity-requests', pathMatch: 'full' },
  { path: 'activity-requests', component: ActivityRequestsComponent },
  { path: 'enhanced-activity-requests', component: EnhancedActivityRequestsComponent },
  { path: 'new-activity-request', component: NewActivityRequestComponent },
  { path: 'edit-activity-request/:id', component: EditActivityRequestComponent },
  { path: 'travel-authorization', component: TravelAuthorizationComponent },
  { path: 'new-imprest-request', component: NewImprestRequestComponent },
  { path: 'edit-imprest-request/:id', component: EditImprestRequestComponent },
  { path: 'fund-claims', component: FundClaimsComponent },
  { path: 'fund-claim-approvers/:id', component: FundClaimApproversComponent },
  { path: 'hr-services', component: HrServicesComponent },
  { path: 'new-leave-application', component: NewLeaveApplicationComponent },
  { path: 'view-leave-application/:id', component: ViewLeaveApplicationComponent },
  { path: 'purchase-requisition', component: PurchaseRequisitionComponent },
  { path: 'stores-requisition', component: StoresRequisitionComponent },
  { path: 'new-purchase-requisition', component: NewPurchaseRequisitionComponent },
  { path: 'edit-purchase-requisition/:id', component: EditPurchaseRequisitionComponent },
  { path: 'new-stores-requisition', component: NewStoresRequisitionComponent },
  { path: 'edit-stores-requisition/:id', component: EditStoresRequisitionComponent },
  { path: '**', redirectTo: '/login' }
];