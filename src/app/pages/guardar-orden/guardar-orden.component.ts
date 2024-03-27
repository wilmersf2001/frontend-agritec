import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { LocationInformationService } from '../../services/location-information.service';

@Component({
  selector: 'app-guardar-orden',
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
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './guardar-orden.component.html',
  styleUrl: './guardar-orden.component.scss',
})
export class GuardarOrdenComponent {
  form!: FormGroup;
  loading = false;
  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private locationService: LocationInformationService
  ) {
    this.createForm();
    this.locationService.getDepartments().subscribe((data: any) => {
      this.departamentos = data.data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      nota: [''],
      tipo_comprobante: ['boleta', Validators.required],
      metodo_pago: ['efectivo', Validators.required],
      departamento_id: ['', Validators.required],
      provincia_id: ['', Validators.required],
      distrito_id: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    this.orderService
      .saveOrder(this.form.value)
      .subscribe(() => {
        this.router.navigate(['inicio']);
      })
      .add(() => {
        this.form.reset();
        this.loading = false;
      });
  }

  getFieldInvalid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control?.touched && control?.invalid;
  }

  onDepartmentChange(departmentId: number) {
    this.getProvincesByDepartment(departmentId);
    this.form.get('provincia_id')?.setValue('');
    this.form.get('distrito_id')?.setValue('');
  }

  getProvincesByDepartment(departmentId: number) {
    this.locationService
      .getProvinciasByDepartamento(departmentId)
      .subscribe((data: any) => {
        this.provincias = data.data;
      });
  }

  onProvinceChange(provinceId: number) {
    this.getDistrictsByProvince(provinceId);
    this.form.get('distrito_id')?.setValue('');
  }

  getDistrictsByProvince(provinceId: number) {
    this.locationService
      .getDistritosByProvincia(provinceId)
      .subscribe((data: any) => {
        this.distritos = data.data;
      });
  }

  enableLocation(fieldName: string) {
    return this.form.get(fieldName)?.value != 0;
  }

  getErrorMessage(fieldName: string, type: string) {
    const control = this.form.get(fieldName);
    if (control!.hasError('required')) {
      return `${type} es un campo requerido.`;
    } else if (control!.hasError('pattern')) {
      return `${type} no es válido.`;
    }
    return '';
  }
}
