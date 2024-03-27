import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productos: Product[] = [];
  categoria: Category = {} as Category;
  form!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.crearFormulario();
  }

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

  crearFormulario() {
    this.form = this.fb.group({
      qty: [1, Validators.required],
      product_id: ['', Validators.required],
    });
  }

  detailsProduct(id: number) {
    this.router.navigate(['producto', id]);
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
