import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static employeeNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const pattern = /^[A-Z]{3}_\d{3,4}$/;
      return pattern.test(control.value) ? null : { invalidEmployeeNumber: true };
    };
  }

  static currency(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const validCurrencies = ['Ksh.', 'USD', 'EUR', 'GBP'];
      return validCurrencies.includes(control.value) ? null : { invalidCurrency: true };
    };
  }

  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const value = parseFloat(control.value);
      return value > 0 ? null : { notPositive: true };
    };
  }

  static dateRange(startDateField: string, endDateField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get(startDateField)?.value;
      const endDate = control.get(endDateField)?.value;
      
      if (!startDate || !endDate) return null;
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return start <= end ? null : { invalidDateRange: true };
    };
  }

  static fileSize(maxSizeInBytes: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const file = control.value as File;
      return file.size <= maxSizeInBytes ? null : { fileTooLarge: true };
    };
  }

  static fileType(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const file = control.value as File;
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      return allowedTypes.includes(extension || '') ? null : { invalidFileType: true };
    };
  }
}