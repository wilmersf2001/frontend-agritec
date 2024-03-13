import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  ACTIONS,
  ACTION_DETAILS,
  CONSTANTES,
} from '../../../../enums/constants.emuns';
import { ActionDetails } from '../../../../interfaces/action-details';

import { Product } from '../../../../interfaces/product';
import { Category } from '../../../../interfaces/category';
import { User } from '../../../../interfaces/user';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { UserService } from '../../../../services/user.service';
import { SnackBarComponent } from '../../../../components/snack-bar/snack-bar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  product: Product;
  action: string;
}

@Component({
  selector: 'app-handle-producto',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [ProductService, CategoryService, UserService],
  templateUrl: './handle-producto.component.html',
  styleUrl: './handle-producto.component.scss',
})
export class HandleProductoComponent {
  $product: Product = {} as Product;
  category: Category[] = [];
  user: User[] = [];
  $action: string = '';
  $actionDetails: ActionDetails = {} as ActionDetails;
  form!: FormGroup;
  actionLoading: boolean = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<HandleProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.$product = data.product;
    this.$action = data.action;
    switch (this.$action) {
      case ACTIONS.CREATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.CREATE];
        this.form = this.fb.group({
          nombre: [''],
          descripcion: [''],
          precio: [''],
          cantidad: [''],
          ruta_imagen: [''],
          user_id: [''],
          category_id: [''],
        });
        break;
      case ACTIONS.UPDATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.UPDATE];
        this.form = this.fb.group({
          nombre: [this.$product.nombre],
          descripcion: [this.$product.descripcion],
          precio: [this.$product.precio],
          cantidad: [this.$product.cantidad],
          ruta_imagen: [this.$product.ruta_imagen],
          user_id: [this.$product.user_id],
          category_id: [this.$product.category_id],
        });
        break;
      case ACTIONS.DELETE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.DELETE];
        this.form = this.fb.group({});
        break;
      case ACTIONS.PERMISSIONS:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.PERMISSIONS];
        this.form = this.fb.group({});
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.category = res.data;
      this.loading = false;
    });
    this.userService.getUsers().subscribe((res) => {
      this.user = res.data;
      this.loading = false;
    });
  }

  submitForm(action: string): void {
    this.actionLoading = true;
    switch (action) {
      case ACTIONS.CREATE:
        this.productService.createProduct(this.form.value).subscribe((res) => {
          this.actionLoading = false;
          this.closeModal();
          this.openSnackBar();
        });
        break;
      case ACTIONS.UPDATE:
        this.productService
          .updateProduct(this.$product.id, this.form.value)
          .subscribe((res) => {
            this.actionLoading = false;
            this.closeModal();
            this.openSnackBar();
          });
        break;
      case ACTIONS.DELETE:
        this.productService.deleteProduct(this.$product.id).subscribe((res) => {
          this.actionLoading = false;
          this.closeModal();
          this.openSnackBar();
        });
        break;
      default:
        break;
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: CONSTANTES.DURATION_SNACKBAR,
      data: { message: 'Usuario eliminado', icon: 'done' },
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
