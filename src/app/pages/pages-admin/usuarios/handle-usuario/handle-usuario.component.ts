import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormGroup } from '@angular/forms';
import {
  ACTIONS,
  ACTION_DETAILS,
  CONSTANTES,
} from '../../../../enums/constants.emuns';
import { User } from '../../../../interfaces/user';
import { ActionDetails } from '../../../../interfaces/action-details';
import { UserService } from '../../../../services/user.service';
import { SnackBarComponent } from '../../../../components/snack-bar/snack-bar.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  usuario: User;
  action: string;
}

@Component({
  selector: 'app-handle-usuario',
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
  providers: [UserService],
  templateUrl: './handle-usuario.component.html',
  styleUrl: './handle-usuario.component.scss',
})
export class HandleUsuarioComponent {
  $user: User = {} as User;
  $action: string = '';
  $actionDetails: ActionDetails = {} as ActionDetails;
  form!: FormGroup;
  actionLoading: boolean = false;
  loading = false;
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<HandleUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.$user = data.usuario;
    this.$action = data.action;
    switch (this.$action) {
      case ACTIONS.CREATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.CREATE];
        this.form = this.fb.group({
          nombres: [''],
          apellidos: [''],
          email: [''],
          telefono: [''],
          usuario: [''],
          password: [''],
          role: ['admin'],
        });
        break;
      case ACTIONS.UPDATE:
        this.$actionDetails = ACTION_DETAILS[ACTIONS.UPDATE];
        this.form = this.fb.group({
          nombres: [this.$user.nombres],
          apellidos: [this.$user.apellidos],
          email: [this.$user.email],
          telefono: [this.$user.telefono],
          usuario: [this.$user.usuario],
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
        this.userService
          .crearCuenta(this.form.value)
          .then((res) => {
            this.closeModal();
            this.openSnackBar();
          })
          .catch((err) => {
            console.log('Error al crear usuario', err);
          });
        break;
      case ACTIONS.UPDATE:
        this.userService
          .updateUser(this.$user.id, this.form.value)
          .subscribe((res) => {
            this.closeModal();
            this.openSnackBar();
          });
        break;
      case ACTIONS.DELETE:
        this.userService.deleteUser(this.$user.id).subscribe((res) => {
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
