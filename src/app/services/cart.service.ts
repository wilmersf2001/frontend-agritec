import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cantidadProducts: number = 0;

  private cartSubject = new BehaviorSubject<any>(
    this.obtenerCantidadProductos()
  );

  private obtenerCantidadProductos() {
    return true;
  }

  constructor(private http: HttpClient) {}

  setStatusCart(status: boolean) {
    this.cartSubject.next(status);
  }

  getStatusCart(): Observable<any> {
    return this.cartSubject.asObservable();
  }

  getCart() {
    return this.http.get<any>(`${BASE_URL}/cart`);
  }

  async addToCart(form: any) {
    const response = await firstValueFrom(
      this.http.post<any>(`${BASE_URL}/cart/${form.product_id}`, form)
    );
    this.setStatusCart(true);
    return response;
  }

  /* updateCart(id: number, product: any) {
    return this.http.put<any>(`${BASE_URL}/cart/${id}`, product);
  } */

  removeProductCart(id: string) {
    return this.http.delete<any>(`${BASE_URL}/cart/${id}`);
  }

  totalCart() {
    return this.http.get<any>(`${BASE_URL}/cart-total`);
  }
}
