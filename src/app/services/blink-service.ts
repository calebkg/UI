import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class BlinkService {

  constructor() { }


  private blinkSubject = new Subject<void>();
  private blinkSubjectFinance = new Subject<void>();
  blink$ = this.blinkSubject.asObservable();
  blink$$ = this.blinkSubjectFinance.asObservable();

  triggerLeaveBlink() {
    this.blinkSubject.next();
  }

 triggerFinaceBlink() {
    this.blinkSubjectFinance.next();
  }
}
