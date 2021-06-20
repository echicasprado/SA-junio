import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {Router} from '@angular/router';

import { UsuarioService } from "../services/usuario.service";
import { usuario } from "../models/user";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  credentialsInvalid: boolean = false;
  messageError: string = '';
  active = 1;
  myFormRest = new FormGroup({
    EditorialName: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),

    EditorialPass: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),

    EditorialEmail: new FormControl("", [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(35),
      Validators.email
    ]),

    EditorialAddress: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
  });

  myForm = new FormGroup({
    userName: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userLastName: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userEmail: new FormControl("", [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(35),
      Validators.email
    ]),
    userPhone: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15)
    ]),
    userPass: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userType: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1)
    ]),


  });

  constructor(private registerService: UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user = this.myForm.value;
    if(user.userName === '' || user.userLastName === '' || user.userPass === '' || user.userEmail === '' 
        || user.userPhone === ''){
      this.credentialsInvalid = true;
      this.messageError = 'Faltan campos a ingresar';
      setTimeout(() => {this.credentialsInvalid = false;},3500);
      return;
    }
    const usuario: usuario = {
      nombre:       user.userName,
      apellido:     user.userLastName,
      correo:       user.userEmail,
      password:     user.userPass,
      editorial:    "editorial 1",
      telefono:     user.userPhone,
      idRol:        +user.userType,
      id_rol:       +user.userType,
      estado:       1
    }
    console.log('***' ,usuario);
    this.registerService.postRegistro(usuario).subscribe((data: {msg:string})=> {
      console.log(data)
      if(data.msg === 'Ya existe un usuario con ese correo'){        
        this.messageError = data.msg;
        this.credentialsInvalid = true;
        setTimeout(() => {this.credentialsInvalid = false;},3500);
        return;
      }
      console.log(data, 'adentro');
      this.router.navigateByUrl('/login');
    }, error => {
      this.credentialsInvalid = true;
      this.messageError = 'Problemas al ingresar las credenciales';
      console.log(error, 'error');
      setTimeout(() => {this.credentialsInvalid = false;},3500);
    })
  }

  onSubmitRest(): void {

  }
}
