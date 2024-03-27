import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent {
  products: Product[] = [];
  form!: FormGroup;

  constructor(
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.productService.getProductRandom().subscribe((data: any) => {
      this.products = data.data;
    });
  }

  detailsProduct(id: number) {
    this.router.navigate(['producto', id]);
  }

  crearFormulario() {
    this.form = this.fb.group({
      qty: [1, Validators.required],
      product_id: ['', Validators.required],
    });
  }

  submitForm(id: number) {
    this.form.controls['product_id'].setValue(id);
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    } else {
      this.cartService.addToCart(this.form.value).then(
        (resp) => {
          console.log(resp);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
