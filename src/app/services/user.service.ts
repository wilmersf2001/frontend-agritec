import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(
    this.getUserFromLocalStorage()
  );

  constructor(private http: HttpClient) {}

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

  crearCuenta(formValue: any) {
    const response = firstValueFrom(
      this.http.post<any>(`${BASE_URL}/users`, formValue)
    );
    return response;
  }

  getUsers() {
    return this.http.get<any>(`${BASE_URL}/users`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${BASE_URL}/users/${id}`);
  }

  updateUser(id: number, formValue: any) {
    return this.http.put<any>(`${BASE_URL}/users/${id}`, formValue);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${BASE_URL}/users/${id}`);
  }
}
