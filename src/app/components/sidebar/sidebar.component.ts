import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryService } from '../../services/category.service';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../interfaces/product';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-sidebar',
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
  providers: [AuthService, CategoryService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  statusLogged = this.userService.getStatusUserLogged();
  userLogged: User = {} as User;
  categorias: Category[] = [];
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getStatusUserLogged().subscribe((status) => {
      this.isLogged = status;
      if (this.isLogged) {
        this.authService.userLogged().subscribe((response) => {
          this.userLogged = response.data;
          console.log(this.userLogged);
        });
      }
    });

    this.categoryService.getCategories().subscribe((response) => {
      this.categorias = response.data;
      console.log(this.categorias);
    });
  }

  logout() {
    this.authService.logout();
  }
}
