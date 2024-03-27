import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// Formulario reactivo
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hidePassword = true;
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      usuario: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.form.value)
      .then(() => {
        this.router.navigate(['inicio']);
      })
      .catch(() => {
        this.form.reset();
        this.openSnackBar();
        this.loading = false;
      });
  }

  redirectToRegister() {
    this.router.navigate(['login-comprador']);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: { message: 'Credenciales incorrectas', icon: 'close' },
    });
  }
}
