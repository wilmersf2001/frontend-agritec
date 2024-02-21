import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginVendedorComponent } from './pages/login-vendedor/login-vendedor.component';
import { LoginCompradorComponent } from './pages/login-comprador/login-comprador.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ConsultoriaComponent } from './pages/consultoria/consultoria.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-vendedor', component: LoginVendedorComponent },
  { path: 'login-comprador', component: LoginCompradorComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'consultoria', component: ConsultoriaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
];
