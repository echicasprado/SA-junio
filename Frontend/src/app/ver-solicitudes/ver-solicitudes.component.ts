import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { get_solicitud } from '../models/solicitud';
import { nuevo_libro, libro } from '../models/libro';

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css']
})
export class VerSolicitudesComponent implements OnInit {

  url_get: string = 'http://35.238.189.26:47008/ObtenerSolicitudes'
  url_eliminar: string = 'http://35.238.189.26:47007/EliminarSolicitud' //URL para eliminar la solicitud
  url_crear: string = 'http://35.238.189.26:47002/book/addBook' //URL para crear el libro en base a la solicitud
  public lista_solicitudes: get_solicitud[] = []
  error;

  constructor(private http: HttpClient, private modal:NgbModal, private router : Router) {

    this.http.get(this.url_get).subscribe((data:get_solicitud[])=> {//data es la respuesta
      this.lista_solicitudes = data;


    },error => this.error = error);

   }

  ngOnInit(): void {
    try{
      var u = localStorage.getItem('usuario');
      var usuario = JSON.parse(u);
      if(usuario.id_rol != 2){
        this.router.navigate(["denegado"]);
      }
    } catch(error){
      this.router.navigate(["denegado"]);
    }
  }

  aceptarSolicitud(libro){

    var u = localStorage.getItem('usuario');
    var usuario = JSON.parse(u);

    var nuevo_libro: nuevo_libro = {
      author:libro.autor,
      category: "",
      coverPage: libro.pdf,
      description: "",
      editorial: usuario.nombre,
      price:0,
      units:0,
      title:libro.nombre
    };

    console.log("Nuevo libro", nuevo_libro);

    
    var res;

    this.http.post(this.url_crear, nuevo_libro).subscribe((data:libro[])=> {//data es la respuesta
      res = data;

      this.eliminarSolicitud(libro);

    },error => this.error = error); 

  }

  eliminarSolicitud(libro){
    var res1;
    this.http.post(this.url_eliminar, libro).subscribe((data1:[])=> {//data es la respuesta
      res1 = data1;
      location.reload();
    },error => this.error = error); 
  }

}