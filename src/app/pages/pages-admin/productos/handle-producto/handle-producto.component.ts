import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  previewFotoCarnet!: string;
  fileNameCarnet: string = '...';
  fileData: any;

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
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          precio: ['', Validators.required],
          cantidad: ['', Validators.required],
          foto_producto: [null],
          user_id: ['', Validators.required],
          category_id: ['', Validators.required],
        });
        break;
      case ACTIONS.UPDATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.UPDATE];
        this.form = this.fb.group({
          nombre: [this.$product.nombre],
          descripcion: [this.$product.descripcion],
          precio: [this.$product.precio],
          cantidad: [this.$product.cantidad],
          foto_producto: [null],
          user_id: [this.$product.usuario.id],
          category_id: [this.$product.category.id],
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
        const formData = new FormData();
        formData.append('foto_producto', this.fileData);
        formData.append('nombre', this.form.get('nombre')?.value);
        formData.append('descripcion', this.form.get('descripcion')?.value);
        formData.append('precio', this.form.get('precio')?.value);
        formData.append('cantidad', this.form.get('cantidad')?.value);
        formData.append('user_id', this.form.get('user_id')?.value);
        formData.append('category_id', this.form.get('category_id')?.value);

        this.productService.createProduct(formData).subscribe((res) => {
          this.actionLoading = false;
          this.closeModal();
          this.openSnackBar();
        });
        break;
      case ACTIONS.UPDATE:
        if (
          this.form.get('foto_producto')?.value == null ||
          this.form.get('foto_producto')?.value == ''
        ) {
          this.productService
            .updateProduct(this.$product.id, this.form.value)
            .subscribe((res) => {
              this.actionLoading = false;
              this.closeModal();
              this.openSnackBar();
            });
        } else {
          const formData = new FormData();
          formData.append('nombre', this.form.get('nombre')?.value);
          formData.append('descripcion', this.form.get('descripcion')?.value);
          formData.append('precio', this.form.get('precio')?.value);
          formData.append('cantidad', this.form.get('cantidad')?.value);
          formData.append('user_id', this.form.get('user_id')?.value);
          formData.append('category_id', this.form.get('category_id')?.value);
          formData.append('foto_producto', this.fileData);

          this.productService
            .updateProduct(this.$product.id, formData)
            .subscribe((res) => {
              this.actionLoading = false;
              this.closeModal();
              this.openSnackBar();
            });
        }
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

  onFileChange(event: any) {
    const fileList = event.target.files;
    const fileReader = new FileReader();

    if (fileList.length > 0) {
      const extension = fileList[0].name.split('.').pop()?.toLowerCase();

      if (extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
        const fotoArchivo = fileList[0];

        this.fileNameCarnet = fotoArchivo.name;
        fileReader.onload = () => {
          this.previewFotoCarnet = fileReader.result as string;
        };
        fileReader.readAsDataURL(fotoArchivo);
        this.fileData = fotoArchivo;
        this.form.get('foto_producto')?.setValue(fotoArchivo);
      } else {
        this.resetPreviewFoto();
      }
    }
  }

  resetPreviewFoto() {
    this.form.get('foto_producto')?.setValue('');
    this.previewFotoCarnet = '';
    this.fileNameCarnet = 'selecciona un archivo..';
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
