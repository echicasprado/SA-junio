import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  constructor(private loginService: UsuarioService, private router:Router){

  }


  canActivate():boolean{
    const clase:number = this.loginService.claseUser();
     if(clase != undefined && clase === 1){
      return true;
    }
    this.router.navigate(['/denegado']);
    return false;
  }  
  
}
