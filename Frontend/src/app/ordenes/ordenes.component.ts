import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../urls/urls';
import { Orden1 } from '../models/orden';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})

export class OrdenesComponent implements OnInit {

  myURL = new URLs();
  url: string = this.myURL.url_ordenes;
  url_editar: string = this.myURL.url_editarOrden;
  public listaordenes: Orden1[] = [];
  error;

  selectedEstado: number;

    estados = [
        { id: 1, name: 'Aceptada' },
        { id: 2, name: 'Importada' },
        { id: 3, name: 'Empaquetada' },
        { id: 4, name: 'En Camino' },
        { id: 5, name: 'Entregada' }
    ];

  constructor(private http: HttpClient, private router : Router) { 

    this.http.get(this.url).subscribe((data:Orden1[])=> {//data es la respuesta
      this.listaordenes = data;

      },error => this.error = error);
  }

  editarEstado(id, estado){
    var editado = '{ "_id":"' + id + '", "estado":' + estado + '}';
    console.log(editado);
    var res;
    
    this.http.post(this.url_editar, editado).subscribe((data)=> {//data es la respuesta
      res = data;
      },error => this.error = error); 
  }

  ngOnInit(): void {
  }

}
