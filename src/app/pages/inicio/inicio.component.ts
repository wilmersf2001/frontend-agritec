import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductRandom().subscribe((data: any) => {
      this.products = data.data;
    });
  }

  detailsProduct(id: number) {
    this.router.navigate(['producto', id]);
  }
}
