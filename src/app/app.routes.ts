import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCompradorComponent } from './pages/login-comprador/login-comprador.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { ConsultoriaComponent } from './pages/consultoria/consultoria.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { RobotCosechaComponent } from './pages/robot-cosecha/robot-cosecha.component';
import { RobotDesmalezadoComponent } from './pages/robot-desmalezado/robot-desmalezado.component';
import { RobotManejoSueloComponent } from './pages/robot-manejo-suelo/robot-manejo-suelo.component';
import { RobotMonitoreoDiagnosticoComponent } from './pages/robot-monitoreo-diagnostico/robot-monitoreo-diagnostico.component';
import { RobotProteccionCultivoComponent } from './pages/robot-proteccion-cultivo/robot-proteccion-cultivo.component';
import { RobotRiegoComponent } from './pages/robot-riego/robot-riego.component';
import { RobotSiembraPlantacionComponent } from './pages/robot-siembra-plantacion/robot-siembra-plantacion.component';
import { RobotVigilanciaSeguridadComponent } from './pages/robot-vigilancia-seguridad/robot-vigilancia-seguridad.component';
//COMPONENTES ADMINISTRADOR
import { ContenidoComponent } from './pages/pages-admin/contenido/contenido.component';
import { ProductosComponent } from './pages/pages-admin/productos/productos.component';
import { SolicitudesComponent } from './pages/pages-admin/solicitudes/solicitudes.component';
import { UsuariosComponent } from './pages/pages-admin/usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-comprador', component: LoginCompradorComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'robot-cosecha', component: RobotCosechaComponent },
  { path: 'robot-desmalezado', component: RobotDesmalezadoComponent },
  { path: 'robot-manejo-suelo', component: RobotManejoSueloComponent },
  {
    path: 'robot-monitoreo-diagnostico',
    component: RobotMonitoreoDiagnosticoComponent,
  },
  {
    path: 'robot-proteccion-cultivo',
    component: RobotProteccionCultivoComponent,
  },
  { path: 'robot-riego', component: RobotRiegoComponent },
  {
    path: 'robot-siembra-plantacion',
    component: RobotSiembraPlantacionComponent,
  },
  {
    path: 'robot-vigilancia-seguridad',
    component: RobotVigilanciaSeguridadComponent,
  },
  { path: 'contenido', component: ContenidoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'consultoria', component: ConsultoriaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
];
