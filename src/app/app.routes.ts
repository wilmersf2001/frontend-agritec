import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCompradorComponent } from './pages/login-comprador/login-comprador.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ConsultoriaComponent } from './pages/consultoria/consultoria.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
//COMPONENTES ADMINISTRADOR
import { ContenidoComponent } from './pages/pages-admin/contenido/contenido.component';
import { CategoriasComponent } from './pages/pages-admin/categorias/categorias.component';
import { ProductosComponent } from './pages/pages-admin/productos/productos.component';
import { SolicitudesComponent } from './pages/pages-admin/solicitudes/solicitudes.component';
import { UsuariosComponent } from './pages/pages-admin/usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-comprador', component: LoginCompradorComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'categoria-productos/:id', component: ProductsComponent },
  { path: 'producto/:id', component: ProductDetailsComponent },
  { path: 'contenido', component: ContenidoComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'consultoria', component: ConsultoriaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
];
