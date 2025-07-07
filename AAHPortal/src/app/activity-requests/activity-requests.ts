@@ .. @@
 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { Router } from '@angular/router';
 import { Subject, takeUntil } from 'rxjs';
-import { SidebarComponent } from '../shared/sidebar/sidebar.component';
-import { HeaderComponent } from '../shared/header/header.component';
-import { DataService, ActivityRequest } from '../../services/data.service';
-import { FooterComponent } from '../shared/footer/footer.component';
+import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
+import { HeaderComponent } from '../components/shared/header/header.component';
+import { DataService, ActivityRequest } from '../services/data.service';
+import { FooterComponent } from '../components/shared/footer/footer.component';
 
 @Component({
   selector: 'app-activity-requests',
   standalone: true,
   imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
 
   templateUrl: './activity-requests.html',
   styleUrls: ['./activity-requests.scss']
 })
 export class ActivityRequestsComponent implements OnInit, OnDestroy {