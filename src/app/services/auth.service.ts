import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BASE_URL } from './service.config';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  async login(formValue: any) {
    const response = await firstValueFrom(
      this.http.post<any>(`${BASE_URL}/login`, formValue)
    );
    this.saveToken(response.token);
    this.userService.setStatusUserLogged(true);

    return response;
  }

  logout() {
    this.http.post<any>(`${BASE_URL}/logout`, {}).subscribe(() => {
      this.removeToken();
      this.router.navigate(['inicio']);
      this.userService.setStatusUserLogged(false);
    });
  }

  userLogged() {
    return this.http.get<any>(`${BASE_URL}/user-logged`);
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }
}
