import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { OrderService } from '../../../services/order.service';
import { fadeInAnimation } from '../../../animations/fade-in.animation';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  animations: [fadeInAnimation],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  displayedColumns: string[] = [
    'id',
    'order_code',
    'customer_name',
    'customer_ap_paterno',
    'customer_ap_materno',
    'customer_phone',
    'customer_address',
    'customer_email',
    'subtotal',
    'tax',
    'total',
    'status',
    'created_at',
  ];
  dataSource = new MatTableDataSource<any>();
  loading = true;
  total: number = 0;
  orders: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe((data: any) => {
      this.dataSource.data = data.data;
      this.total = data.meta.total;
      this.loading = false;
    });
  }
}
