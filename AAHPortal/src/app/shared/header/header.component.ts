import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = 'PROFILE';
  @Input() subtitle: string = '';
  @Input() headerClass: string = '';
  @Input() showBackButton: boolean = false;
  @Input() sidebarOpen: boolean = false;
  
  @Output() sidebarOpenChange = new EventEmitter<boolean>();
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpenChange.emit(this.sidebarOpen);
  }
  
  goBack() {
    window.history.back();
  }
  
  logout() {
    console.log('Logging out');
    // Implement logout logic
  }
}