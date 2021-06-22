import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

import { solicitud } from "../models/solicitud";

@Component({
  selector: 'app-solicitar-libro',
  templateUrl: './solicitar-libro.component.html',
  styleUrls: ['./solicitar-libro.component.css']
})
export class SolicitarLibroComponent implements OnInit {

  url: string = 'http://35.238.189.26:47009/SolicitarLibro';
  imagen = '';
  imag64 = '';
  error;

  constructor(private router: Router, private http: HttpClient) { }

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

  handleUpload(event) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const imagen: string = reader.result.toString();
        const sinMetadata: string = imagen.split(';base64,')[1];
        this.imagen = reader.result.toString();
        this.imag64 = sinMetadata;
    };
  }

  myForm = new FormGroup({
    nombre: new FormControl(""),
    autor: new FormControl(""),
    primera_publicacion: new FormControl(""),
    pdf: new FormControl("")
  });

  get primera_publicacion(){
    return this.myForm.get('primera_publicacion')
  }
  get nombre(){
    return this.myForm.get('nombre')
  }
  get autor(){
    return this.myForm.get('autor')
  }

  onSubmit(): void {
    var solicitud = this.myForm.value;

    if(this.imagen != '')
    {
      this.myForm.setValue({
        "nombre":solicitud.nombre,
        "autor":solicitud.autor,
        "primera_publicacion":solicitud.primera_publicacion,
        "pdf": this.imag64
      })
    }
    else
    {
      this.myForm.setValue({
        "nombre":solicitud.nombre,
        "autor":solicitud.autor,
        "primera_publicacion":solicitud.primera_publicacion,
        "pdf": ""
      })
    }

    solicitud = this.myForm.value;

    var res;
    
    this.http.post(this.url, solicitud).subscribe((data:solicitud[])=> {//data es la respuesta
      res = data;
      console.log("Res", res)
      location.reload();
    },error => this.error = error); 
  }

}
