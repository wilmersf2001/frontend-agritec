import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(
    this.getUserFromLocalStorage()
  );

  constructor() {}

  setStatusUserLogged(status: boolean) {
    this.userSubject.next(status);
  }

  getStatusUserLogged(): Observable<any> {
    return this.userSubject.asObservable();
  }

  private getUserFromLocalStorage(): any {
    const storedUser = localStorage.getItem('token');
    return storedUser ? true : false;
  }
}
