import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: Product = {} as Product;
  cantidad: number = 1;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe((res) => {
        this.product = res.data;
        this.form.controls['product_id'].setValue(this.product.id);
      });
    });
  }

  crearFormulario() {
    this.form = this.fb.group({
      qty: [1, Validators.required],
      product_id: [this.product.id, Validators.required],
    });
  }

  submitForm() {
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

  sumaCantidad() {
    this.cantidad += 1;
    this.form.controls['qty'].setValue(this.cantidad);
  }

  restarCantidad() {
    this.cantidad -= 1;
    if (this.cantidad < 1) {
      this.form.controls['qty'].setValue(1);
      this.cantidad = 1;
    } else {
      this.form.controls['qty'].setValue(this.cantidad);
    }
  }
}
