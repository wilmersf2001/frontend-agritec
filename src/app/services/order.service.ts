import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(`${BASE_URL}/orders`);
  }

  saveOrder(data: any) {
    return this.http.post(`${BASE_URL}/orders`, data);
  }
}
