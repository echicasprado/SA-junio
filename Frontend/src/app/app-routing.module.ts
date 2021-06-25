import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { RegistroComponent } from "./registro/registro.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from "./pedido/pedido.component";
import { DenegadoComponent } from "./denegado/denegado.component";
import { UsuarioGuard } from "./guards/usuario.guard";
import { AdministradorGuard } from "./guards/administrador.guard";
import { CarritoComponent } from './carrito/carrito.component';
import { LibrosComponent } from './libros/libros.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitarLibroComponent } from './solicitar-libro/solicitar-libro.component';
import { VerSolicitudesComponent } from './ver-solicitudes/ver-solicitudes.component';
import { LogEditorialComponent } from './log-editorial/log-editorial.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';

const routes: Routes = [
 
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'registro', 
    component: RegistroComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate:[UsuarioGuard, AdministradorGuard]
  },
  { 
    path: 'pedidos', 
    component: PedidoComponent,
    canActivate:[UsuarioGuard, AdministradorGuard]
  },
  { 
    path: 'denegado', 
    component: DenegadoComponent 
  },
  {
  path: 'carrito', 
  component: CarritoComponent 
  },
  {
  path: 'libros', 
  component: LibrosComponent
  },
  {
  path: 'perfil-cliente', 
  component: PerfilClienteComponent 
  },
  {
    path: 'usuarios', 
    component: UsuariosComponent 
  },
  {
    path: 'solicitar', 
    component: SolicitarLibroComponent 
  },
  {
    path: 'solicitudes', 
    component: VerSolicitudesComponent 
  },
  {
    path: 'log-editorial', 
    component: LogEditorialComponent 
  },
  {
    path: 'impuestos', 
    component: ImpuestosComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
