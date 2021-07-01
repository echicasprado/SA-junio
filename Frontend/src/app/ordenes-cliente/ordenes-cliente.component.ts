import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../urls/urls';
import { Orden1 } from '../models/orden';

@Component({
  selector: 'app-ordenes-cliente',
  templateUrl: './ordenes-cliente.component.html',
  styleUrls: ['./ordenes-cliente.component.css']
})
export class OrdenesClienteComponent implements OnInit {

  myURL = new URLs();
  url: string = this.myURL.url_ordenes;
  public listaordenes: Orden1[] = []
  public lista_misordenes: Orden1[] = []

  error;

  constructor(private http: HttpClient, private router : Router) { 
    var u = localStorage.getItem('usuario');
    var usuario = JSON.parse(u);

    this.http.get(url).subscribe((data:Orden1[])=> {//data es la respuesta
      this.listaordenes = data;
      this.lista_misordenes = this.listaordenes.filter(orden => orden.usuario == usuario.correo)
      console.log("Lista de ordenes", this.lista_misordenes);
      

      },error => this.error = error);

  }

  ngOnInit(): void {
    try{
      var u = localStorage.getItem('usuario');
      var usuario = JSON.parse(u);
      if(usuario.id_rol != 3){
        this.router.navigate(["denegado"]);
      }
    } catch(error){
      this.router.navigate(["denegado"]);
    }
  }

}
