import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-robot-desmalezado',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './robot-desmalezado.component.html',
  styleUrl: './robot-desmalezado.component.scss',
})
export class RobotDesmalezadoComponent {
  productos: Product[] = [];
  categoria: Category = {} as Category;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategory(3).subscribe((res) => {
      this.categoria = res.data;
    });

    this.categoryService.getProductsByCategory(3).subscribe((res) => {
      this.productos = res;
    });
  }
}
