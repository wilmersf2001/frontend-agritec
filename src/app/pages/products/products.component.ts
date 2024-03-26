import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productos: Product[] = [];
  categoria: Category = {} as Category;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categoryService.getCategory(params['id']).subscribe((res) => {
        this.categoria = res.data;
      });

      this.categoryService
        .getProductsByCategory(params['id'])
        .subscribe((res) => {
          this.productos = res;
        });
    });
  }

  detailsProduct(id: number) {
    this.router.navigate(['producto', id]);
  }
}
