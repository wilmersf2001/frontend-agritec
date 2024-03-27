import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
//RUTAS
import { User } from './interfaces/user';
//SERVICES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
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
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  statusLogged = this.userService.getStatusUserLogged();
  statusCart = this.cartService.getStatusCart();
  userLogged: User = {} as User;
  isLogged: boolean = false;
  cantidadProducts: number = 0;
  productosAgregados: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getStatusUserLogged().subscribe((status) => {
      this.isLogged = status;
      if (this.isLogged) {
        this.authService.userLogged().subscribe((response) => {
          this.userLogged = response.data;
          if (this.userLogged.role === 'admin') {
            this.router.navigate(['contenido']);
          }
        });
      }
    });

    if (localStorage.getItem('token')) {
      this.cartService.getStatusCart().subscribe((status) => {
        if (status) {
          this.cartService.getCart().subscribe((res) => {
            this.productosAgregados = [];
            for (let key in res) {
              if (res.hasOwnProperty(key)) {
                this.productosAgregados.push(res[key]);
              }
            }
            this.cantidadProducts = Object.keys(res).length;
          });
        }
      });
    }
  }

  removeProductCart(rowId: string) {
    this.cartService.removeProductCart(rowId).subscribe((res) => {
      this.cartService.getCart().subscribe((res) => {
        this.productosAgregados = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            this.productosAgregados.push(res[key]);
          }
        }
        this.cantidadProducts = Object.keys(res).length;
      });
    });
  }

  finalizarCompra() {
    this.router.navigate(['finalizar-compra']);
  }

  logout() {
    this.authService.logout();
  }
}
