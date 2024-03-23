import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  providers: [CategoryService],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.scss',
})
export class ContenidoComponent {
  defaultSelected: string = '1';
  loading = true;
  nombreCategoria: string = 'Contenido';
  productos: Product[] = [];
  categorias: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.getProductosByCategoria();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categorias = data.data;
      console.log('categorias', this.categorias);
    });
  }

  getProductosByCategoria(event: any = { value: '1' }) {
    this.defaultSelected = event.value;

    this.categoryService
      .getProductsByCategory(event.value)
      .subscribe((data: any) => {
        this.productos = data;
        console.log('productos', this.productos);
      });
  }
}
