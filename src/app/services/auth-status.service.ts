import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoggedInStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
