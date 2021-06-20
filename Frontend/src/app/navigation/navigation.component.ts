import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  tipouser: number = 0;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    console.log(this.usuarioService.claseUser(),'  ****************')
    this.tipouser = JSON.parse(localStorage.getItem('usuario')).id_rol; 
  }


  isCollapse = false;   // guardamos el valor
    toggleState() { // manejador del evento
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }

}
