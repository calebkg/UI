import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'date' | 'dateRange' | 'text' | 'number';
  options?: { value: any; label: string }[];
  placeholder?: string;
}

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-filter-container">
      <div class="search-section">
        <!-- Filter Toggle Button -->
        <button class="filter-btn" (click)="toggleFilters()" [class.active]="showFilters">
          <img src="assets/Add filter.svg" alt="Add filter" width="16" height="16" />
          {{ showFilters ? 'Hide Filters' : 'Add Filter' }}
          <span class="filter-count" *ngIf="activeFilterCount > 0">({{ activeFilterCount }})</span>
        </button>
        
        <!-- Search Box -->
        <div class="search-box">
          <img src="assets/Search here.svg" alt="Search" width="16" height="16" class="search-icon" />
          <input type="text" 
                 [placeholder]="searchPlaceholder" 
                 [(ngModel)]="searchTerm" 
                 (ngModelChange)="onSearchChange($event)"
                 class="search-input">
          <button *ngIf="searchTerm" class="clear-search" (click)="clearSearch()">×</button>
        </div>
        
        <!-- Quick Filters -->
        <div class="quick-filters" *ngIf="quickFilters.length > 0">
          <button *ngFor="let filter of quickFilters"
                  class="quick-filter-btn"
                  [class.active]="activeQuickFilter === filter.value"
                  (click)="onQuickFilter(filter)">
            {{ filter.label }}
          </button>
        </div>
      </div>
      
      <!-- Advanced Filters Panel -->
      <div class="filters-panel" *ngIf="showFilters && filterOptions.length > 0">
        <div class="filters-grid">
          <div *ngFor="let option of filterOptions" class="filter-group">
            <label>{{ option.label }}</label>
            
            <!-- Select Filter -->
            <select *ngIf="option.type === 'select'" 
                    [(ngModel)]="filters[option.key]"
                    (ngModelChange)="onFilterChange()">
              <option value="">All {{ option.label }}</option>
              <option *ngFor="let opt of option.options" [value]="opt.value">
                {{ opt.label }}
              </option>
            </select>
            
            <!-- Text Filter -->
            <input *ngIf="option.type === 'text'"
                   type="text"
                   [(ngModel)]="filters[option.key]"
                   (ngModelChange)="onFilterChange()"
                   [placeholder]="option.placeholder || 'Enter ' + option.label">
            
            <!-- Number Filter -->
            <input *ngIf="option.type === 'number'"
                   type="number"
                   [(ngModel)]="filters[option.key]"
                   (ngModelChange)="onFilterChange()"
                   [placeholder]="option.placeholder || 'Enter ' + option.label">
            
            <!-- Date Filter -->
            <input *ngIf="option.type === 'date'"
                   type="date"
                   [(ngModel)]="filters[option.key]"
                   (ngModelChange)="onFilterChange()">
            
            <!-- Date Range Filter -->
            <div *ngIf="option.type === 'dateRange'" class="date-range">
              <input type="date"
                     [(ngModel)]="filters[option.key + '_from']"
                     (ngModelChange)="onFilterChange()"
                     placeholder="From">
              <span>to</span>
              <input type="date"
                     [(ngModel)]="filters[option.key + '_to']"
                     (ngModelChange)="onFilterChange()"
                     placeholder="To">
            </div>
          </div>
        </div>
        
        <div class="filter-actions">
          <button class="btn btn-primary" (click)="applyFilters()">Apply Filters</button>
          <button class="btn btn-secondary" (click)="clearFilters()">Clear All</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  @Input() searchPlaceholder = 'Search here';
  @Input() filterOptions: FilterOption[] = [];
  @Input() quickFilters: { label: string; value: any }[] = [];
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() quickFilterChange = new EventEmitter<any>();

  searchTerm = '';
  showFilters = false;
  filters: any = {};
  activeQuickFilter: any = null;

  get activeFilterCount(): number {
    return Object.values(this.filters).filter(value => 
      value !== null && value !== undefined && value !== ''
    ).length;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.searchChange.emit(term);
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange('');
  }

  onFilterChange() {
    this.filterChange.emit({ ...this.filters });
  }

  onQuickFilter(filter: { label: string; value: any }) {
    this.activeQuickFilter = this.activeQuickFilter === filter.value ? null : filter.value;
    this.quickFilterChange.emit(this.activeQuickFilter);
  }

  applyFilters() {
    this.onFilterChange();
    this.showFilters = false;
  }

  clearFilters() {
    this.filters = {};
    this.activeQuickFilter = null;
    this.onFilterChange();
    this.quickFilterChange.emit(null);
  }
}