import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Se necesitasn para radioButtons
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//services

// services
import { UsuarioService } from "./services/usuario.service";
import { ProductoService } from "./services/producto.service";

// components
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoComponent } from './pedido/pedido.component';
import { DenegadoComponent } from './denegado/denegado.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LibrosComponent } from './libros/libros.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitarLibroComponent } from './solicitar-libro/solicitar-libro.component';
import { VerSolicitudesComponent } from './ver-solicitudes/ver-solicitudes.component';
import { LogEditorialComponent } from './log-editorial/log-editorial.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistroComponent,
    AdminComponent,
    HomeComponent,
    PedidoComponent,
    DenegadoComponent,
    CarritoComponent,
    LibrosComponent,
    PerfilClienteComponent,
    UsuariosComponent,
    SolicitarLibroComponent,
    VerSolicitudesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
