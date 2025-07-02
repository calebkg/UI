import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface PurchaseRequisition {
  id: string;
  employeeName: string;
  employeeNumber: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purpose: string;
  status: string;
}

@Component({
  selector: 'app-purchase-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.scss']
})
export class PurchaseRequisitionComponent {
  sidebarOpen = false;
  purchaseRequisitions: PurchaseRequisition[] = [
    { id: 'PR-001', employeeName: 'John Doe', employeeNumber: 'EMP001', itemDescription: 'Printer', quantity: 2, unitPrice: 15000, totalPrice: 30000, purpose: 'Office use', status: 'Pending' },
    { id: 'PR-002', employeeName: 'Jane Smith', employeeNumber: 'EMP002', itemDescription: 'Laptop', quantity: 1, unitPrice: 80000, totalPrice: 80000, purpose: 'New staff', status: 'Approved' }
  ];
  showNewForm = false;
  editingReq: PurchaseRequisition | null = null;
  formReq: PurchaseRequisition = this.getEmptyReq();
  searchTerm: string = '';

  constructor(private router: Router) {}

  getEmptyReq(): PurchaseRequisition {
    return { id: '', employeeName: '', employeeNumber: '', itemDescription: '', quantity: 1, unitPrice: 0, totalPrice: 0, purpose: '', status: 'Pending' };
  }

  closeForm() {
    this.showNewForm = false;
    this.editingReq = null;
    this.formReq = this.getEmptyReq();
  }

  addNew() {
    this.router.navigate(['/new-purchase-requisition']);
  }

  editRequisition(req: PurchaseRequisition) {
    this.router.navigate(['/edit-purchase-requisition', req.id]);
  }

  submitForm() {
    if (this.editingReq) {
      // Update existing
      const idx = this.purchaseRequisitions.findIndex(r => r.id === this.editingReq!.id);
      if (idx !== -1) this.purchaseRequisitions[idx] = { ...this.formReq };
    } else {
      // Add new
      this.formReq.id = 'PR-' + (this.purchaseRequisitions.length + 1).toString().padStart(3, '0');
      this.purchaseRequisitions.push({ ...this.formReq });
    }
    this.closeForm();
  }

  triggerFileUpload() {}

  get filteredRequisitions() {
    if (!this.searchTerm) return this.purchaseRequisitions;
    const term = this.searchTerm.toLowerCase();
    return this.purchaseRequisitions.filter(req =>
      Object.values(req).some(val => val && val.toString().toLowerCase().includes(term))
    );
  }
}