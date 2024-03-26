import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLinkActive,
    RouterLink,
    MatDividerModule,
    MatTooltipModule,
  ],
  providers: [AuthService],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {
  statusLogged = this.userService.getStatusUserLogged();
  userLogged: User = {} as User;
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getStatusUserLogged().subscribe((status) => {
      this.isLogged = status;
      if (this.isLogged) {
        this.authService.userLogged().subscribe((response) => {
          this.userLogged = response.data;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
