import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { get_solicitud } from '../models/solicitud';
import { nuevo_libro, libro } from '../models/libro';
import { URLs } from '../urls/urls';

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.component.html',
  styleUrls: ['./ver-solicitudes.component.css']
})
export class VerSolicitudesComponent implements OnInit {

  myURL = new URLs();
  url_get: string = this.myURL.url_getSolicitudes
  url_eliminar: string = this.myURL.url_deleteSolicitudes //URL para eliminar la solicitud
  url_crear: string =  this.myURL.url_crear //URL para crear el libro en base a la solicitud
  url_newBitacora: string = this.myURL.url_newBitacora;

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

  myBitacora = new FormGroup({
    editorial: new FormControl(""),
    operacion: new FormControl(""),
    description: new FormControl("")
  });

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
      this.crearBitacora("Aceptar solicitud de libro",`Autor: ${libro.author}\nTitulo: ${libro.title}\nCategoria: ${libro.category}\nPrecio${libro.price}\nUnidades: ${libro.units}`);
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

  crearBitacora(tipoOperacion,descripcion){
    var res;
    var creado;

    this.myBitacora.setValue({
      "editorial": JSON.parse(localStorage.getItem('usuario')).nombre,
      "operacion": tipoOperacion,
      "description": descripcion
    })

    creado = this.myBitacora.value;

    this.http.post(this.url_newBitacora, creado).subscribe((data:libro[])=> {
      console.log("Valor de res", res)
      },error => this.error = error); 
  }

}
