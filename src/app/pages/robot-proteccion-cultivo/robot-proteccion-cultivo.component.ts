import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-robot-proteccion-cultivo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './robot-proteccion-cultivo.component.html',
  styleUrl: './robot-proteccion-cultivo.component.scss',
})
export class RobotProteccionCultivoComponent {
  productos: Product[] = [];
  categoria: Category = {} as Category;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategory(6).subscribe((res) => {
      this.categoria = res.data;
    });

    this.categoryService.getProductsByCategory(6).subscribe((res) => {
      this.productos = res;
    });
  }
}
