import { Injectable } from '@angular/core';
import { BASE_URL } from './service.config';
import { HttpClient } from '@angular/common/http';

import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(`${BASE_URL}/categories`);
  }

  getCategory(id: number) {
    return this.http.get<any>(`${BASE_URL}/categories/${id}`);
  }

  createCategory(category: any) {
    return this.http.post<any>(`${BASE_URL}/categories`, category);
  }

  updateCategory(id: number, category: Category) {
    console.log('category', category, id);
    return this.http.put<any>(`${BASE_URL}/categories/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${BASE_URL}/categories/${id}`);
  }
}
