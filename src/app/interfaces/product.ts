export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  ruta_imagen: string;
  user_id: number;
  category_id: number;
  usuario: User;
  category: Category;
  created_at: string;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  role: string;
}
