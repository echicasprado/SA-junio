import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(private loginService: UsuarioService, private router: Router){

  }
  canActivate():boolean{

    if(this.loginService.estaLog()){
      return true;
    }
    this.router.navigate(['/denegado']);
    return false;
  }
  
}
