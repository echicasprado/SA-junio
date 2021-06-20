import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  tipouser: number = 0;

  constructor(public usuarioService: UsuarioService, private router: Router) { 
    router.events.subscribe((val) => {
      // see also 
      try{
        this.tipouser = JSON.parse(localStorage.getItem('usuario')).id_rol; 
      } catch(error){
        this.tipouser = 0;
      }
    
  });
  }

  
  denegado(){
    this.router.navigate(["denegado"]);
  }

  ngOnInit(): void {
  }


  isCollapse = false;   // guardamos el valor
    toggleState() { // manejador del evento
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }

}
