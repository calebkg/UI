import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface StoresRequisition {
  id: string;
  employeeName: string;
  employeeNumber: string;
  itemDescription: string;
  quantity: number;
  unitOfIssue: string;
  purpose: string;
  notes: string;
  status: string;
}

@Component({
  selector: 'app-stores-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './stores-requisition.component.html',
  styleUrls: ['./stores-requisition.component.scss']
})
export class StoresRequisitionComponent {
  storesRequisitions: StoresRequisition[] = [
    { id: 'SR-001', employeeName: 'Alice Brown', employeeNumber: 'EMP003', itemDescription: 'Paper', quantity: 10, unitOfIssue: 'Ream', purpose: 'Printing', notes: '', status: 'Pending' },
    { id: 'SR-002', employeeName: 'Bob White', employeeNumber: 'EMP004', itemDescription: 'Stapler', quantity: 2, unitOfIssue: 'Piece', purpose: 'Office use', notes: '', status: 'Approved' }
  ];
  showNewForm = false;
  editingReq: StoresRequisition | null = null;
  formReq: StoresRequisition = this.getEmptyReq();
  searchTerm: string = '';

  constructor(private router: Router) {}

  getEmptyReq(): StoresRequisition {
    return { id: '', employeeName: '', employeeNumber: '', itemDescription: '', quantity: 1, unitOfIssue: '', purpose: '', notes: '', status: 'Pending' };
  }

  closeForm() {
    this.showNewForm = false;
    this.editingReq = null;
    this.formReq = this.getEmptyReq();
  }

  editRequisition(req: StoresRequisition) {
    this.router.navigate(['/edit-stores-requisition', req.id]);
  }

  submitForm() {
    if (this.editingReq) {
      // Update existing
      const idx = this.storesRequisitions.findIndex(r => r.id === this.editingReq!.id);
      if (idx !== -1) this.storesRequisitions[idx] = { ...this.formReq };
    } else {
      // Add new
      this.formReq.id = 'SR-' + (this.storesRequisitions.length + 1).toString().padStart(3, '0');
      this.storesRequisitions.push({ ...this.formReq });
    }
    this.closeForm();
  }

  triggerFileUpload() {}

  addNew() {
    this.router.navigate(['/new-stores-requisition']);
  }

  get filteredRequisitions() {
    if (!this.searchTerm) return this.storesRequisitions;
    const term = this.searchTerm.toLowerCase();
    return this.storesRequisitions.filter(req =>
      Object.values(req).some(val => val && val.toString().toLowerCase().includes(term))
    );
  }
} 