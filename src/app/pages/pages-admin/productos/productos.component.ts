import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { Product } from '../../../interfaces/product';
import { fadeInAnimation } from '../../../animations/fade-in.animation';
import { ProductService } from '../../../services/product.service';
import { HandleProductoComponent } from './handle-producto/handle-producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
  ],
  animations: [fadeInAnimation],
  providers: [ProductService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'precio',
    'cantidad',
    'ruta_imagen',
    'user_id',
    'categoria_id',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  loading = true;
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.total = data.meta.total;
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchPostulante(searchQuery: string) {
    this.loading = true;

    this.productService
      .getSearchProducto(searchQuery)
      .subscribe((data: any) => {
        this.dataSource.data = data.data;
        this.total = data.meta.total;
        this.loading = false;
      });
  }

  openDialog(action: string, product?: Product): void {
    const dialogRef = this.dialog.open(HandleProductoComponent, {
      data: {
        product: product,
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
