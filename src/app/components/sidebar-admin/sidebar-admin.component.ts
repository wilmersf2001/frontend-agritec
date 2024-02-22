import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

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
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {
  openedSubMenu: string | null = null;

  toggleSubMenu(item: string): void {
    if (this.openedSubMenu === item) {
      this.openedSubMenu = null;
    } else {
      this.openedSubMenu = item;
    }
  }

  getUserLogged() {
    /* this.userService.getUserLogged().subscribe((res: any) => {
      this.userLogged = res.data;
    }); */
  }

  logout() {
    /* this.authService.logout(); */
  }
}
