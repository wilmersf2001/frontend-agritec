import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
//RUTAS
import { User } from './interfaces/user';
//SERVICES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
//COMPONENTS
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    MatMenuModule,
    SidebarAdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend-agritec';
  statusLogged = this.userService.getStatusUserLogged();
  userLogged: User = {} as User;
  isLogged: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getStatusUserLogged().subscribe((status) => {
      this.isLogged = status;
      this.authService.userLogged().subscribe((response) => {
        this.userLogged = response.data;
        if (this.userLogged.role === 'admin') {
          this.router.navigate(['contenido']);
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
