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
import { Category } from '../../../../interfaces/category';

import { CategoryService } from '../../../../services/category.service';
import { ActionDetails } from '../../../../interfaces/action-details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../../components/snack-bar/snack-bar.component';

export interface DialogData {
  category: Category;
  action: string;
}

@Component({
  selector: 'app-handle-categoria',
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
  templateUrl: './handle-categoria.component.html',
  styleUrl: './handle-categoria.component.scss',
})
export class HandleCategoriaComponent {
  $category: Category = {} as Category;
  $action: string = '';
  $actionDetails: ActionDetails = {} as ActionDetails;
  form!: FormGroup;
  actionLoading: boolean = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<HandleCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.$category = data.category;
    this.$action = data.action;
    switch (this.$action) {
      case ACTIONS.CREATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.CREATE];
        this.form = this.fb.group({
          nombre: [''],
          descripcion: [''],
        });
        break;
      case ACTIONS.UPDATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.UPDATE];
        this.form = this.fb.group({
          nombre: [this.$category.nombre],
          descripcion: [this.$category.descripcion],
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

  submitForm(action: string): void {
    this.actionLoading = true;
    switch (action) {
      case ACTIONS.CREATE:
        this.categoryService
          .createCategory(this.form.value)
          .subscribe((res) => {
            this.actionLoading = false;
            this.closeModal();
            this.openSnackBar();
          });
        break;
      case ACTIONS.UPDATE:
        this.categoryService
          .updateCategory(this.$category.id, this.form.value)
          .subscribe((res) => {
            this.actionLoading = false;
            this.closeModal();
            this.openSnackBar();
          });
        break;
      case ACTIONS.DELETE:
        this.categoryService
          .deleteCategory(this.$category.id)
          .subscribe((res) => {
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
