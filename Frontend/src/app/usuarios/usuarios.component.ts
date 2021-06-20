import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { usuario } from '../models/user';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  url: string = 'http://34.134.68.224:47001/Usuarios';
  url_eliminar: string = 'http://34.134.68.224:47001/Eliminar_Usuario';
  url_editar: string = 'http://34.134.68.224:47001/Actualizar_Usuario';
  public listaUsuarios = []
  error;

  constructor(private router: Router, private http: HttpClient, private modal:NgbModal) { 

    this.http.get(this.url).subscribe((data:usuario[])=> {//data es la respuesta
      this.listaUsuarios = data;


      },error => this.error = error);
      
  }

  ngOnInit(): void {
  }

  myFormEditar = new FormGroup({
    _id: new FormControl(""),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    correo: new FormControl(""),
    password: new FormControl(""),
    editorial: new FormControl(""),
    telefono: new FormControl(""),
    id_rol: new FormControl(""),
    estado: new FormControl(""),
  });

  abrirCentrado(contenido){
    this.modal.open(contenido,{centered:true});
  }

  eliminarUsuario(usuario){
    var res;
    this.http.post(this.url_eliminar, usuario).subscribe((data:[])=> {//data es la respuesta
      res = data;
      location.reload();
      },error => this.error = error);
  }

  editar(usuario, abrir){
    localStorage.setItem('user-edit', JSON.stringify(usuario));

    this.myFormEditar.setValue({
        "_id": JSON.parse(localStorage.getItem('user-edit'))._id,
        "nombre": JSON.parse(localStorage.getItem('user-edit')).nombre,
        "apellido": JSON.parse(localStorage.getItem('user-edit')).apellido,
        "correo": JSON.parse(localStorage.getItem('user-edit')).correo,
        "password": JSON.parse(localStorage.getItem('user-edit')).password,
        "telefono": JSON.parse(localStorage.getItem('user-edit')).telefono,
        "id_rol": JSON.parse(localStorage.getItem('user-edit')).id_rol,
        "estado": JSON.parse(localStorage.getItem('user-edit')).estado,
        "editorial": JSON.parse(localStorage.getItem('user-edit')).editorial
    })

    this.abrirCentrado(abrir);
    
  }

  editarUsuario(){
    var editado = this.myFormEditar.value;
    var res;

    this.http.put(this.url_editar, editado).subscribe((data:usuario[])=> {//data es la respuesta
      res = data;
      location.reload();
      },error => this.error = error); 
  }

  eliminarUsuarioStorage(){
    localStorage.removeItem('user-edit');
  }

}
