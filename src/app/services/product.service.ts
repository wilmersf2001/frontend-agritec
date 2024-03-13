import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${BASE_URL}/products`);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${BASE_URL}/products/${id}`);
  }

  createProduct(product: any) {
    return this.http.post<any>(`${BASE_URL}/products`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put<any>(`${BASE_URL}/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${BASE_URL}/products/${id}`);
  }
}
