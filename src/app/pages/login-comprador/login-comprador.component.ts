import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-comprador',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserService],
  templateUrl: './login-comprador.component.html',
  styleUrl: './login-comprador.component.scss',
})
export class LoginCompradorComponent {
  hide = true;
  form!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      role: ['cliente', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    this.userService
      .crearCuenta(this.form.value)
      .then(() => {
        this.router.navigate(['inicio']);
      })
      .catch(() => {
        this.form.reset();
        this.loading = false;
      });
  }

  getFieldInvalid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control?.touched && control?.invalid;
  }
}
