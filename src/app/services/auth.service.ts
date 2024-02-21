import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from './service.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(formValue: any) {
    const response = await firstValueFrom(
      this.http.post<any>(`${BASE_URL}/login`, formValue)
    );
    this.saveToken(response.token);

    return response;
  }

  logout() {
    this.http.post<any>(`${BASE_URL}/logout`, {}).subscribe(() => {
      this.removeToken();
      this.router.navigate(['login']);
    });
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }
}
