import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../../animations/fade-in.animation';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-finalizar-compra',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  animations: [fadeInAnimation],
  templateUrl: './finalizar-compra.component.html',
  styleUrl: './finalizar-compra.component.scss',
})
export class FinalizarCompraComponent {
  loading = true;
  displayedColumns: string[] = [
    'id',
    'Imagen',
    'Producto',
    'Precio',
    'Cantidad',
    'Subtotal',
  ];
  dataSource: any[] = [];
  cantidadProducts: number = 0;
  totalCart: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data: any) => {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.dataSource.push(data[key]);
        }
      }
      this.cantidadProducts = Object.keys(data).length;
      this.loading = false;
    });

    this.cartService.totalCart().subscribe((data: any) => {
      this.totalCart = data;
      console.log(this.totalCart);
    });
  }

  irInicio() {
    this.router.navigate(['/']);
  }

  guardarOrden() {
    this.router.navigate(['/guardar-orden']);
  }
}
