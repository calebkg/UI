import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlinkService } from '../../../services/blink-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sidebarType: 'dashboard' | 'finance' | 'hr' = 'dashboard';
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  constructor(private router: Router, private blinkService: BlinkService ) {}

   triggerLeaveBlink() {
    this.blinkService.triggerLeaveBlink();
  }
  triggerFianaceBlink() {
    this.blinkService.triggerFinaceBlink();
  }

  closeSidebar() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}