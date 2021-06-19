import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {Router} from '@angular/router';

import { UsuarioService } from "../services/usuario.service";
import { usuario } from "../models/user";

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})


export class PerfilClienteComponent implements OnInit {

  credentialsInvalid: boolean = false;
  messageError: string = '';
  active = 1;
  usuario: string ="";
  tipouser: number = JSON.parse(localStorage.getItem('usuario')).id_rol; 
  

  myForm = new FormGroup({
    
    userName: new FormControl(JSON.parse(localStorage.getItem('usuario')).nombre , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userLastName: new FormControl(JSON.parse(localStorage.getItem('usuario')).apellido , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    userEmail: new FormControl(JSON.parse(localStorage.getItem('usuario')).correo , [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(35),
      Validators.email
    ]),
    userPhone: new FormControl(JSON.parse(localStorage.getItem('usuario')).telefono , [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15)
    ]),
    userPass: new FormControl(JSON.parse(localStorage.getItem('usuario')).password , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    
  });


  myFormRest = new FormGroup({
    EditorialName: new FormControl(JSON.parse(localStorage.getItem('usuario')).nombre , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),

    EditorialPass: new FormControl(JSON.parse(localStorage.getItem('usuario')).password , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),

    EditorialEmail: new FormControl(JSON.parse(localStorage.getItem('usuario')).correo , [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(35),
      Validators.email
    ]),

    EditorialPhone: new FormControl(JSON.parse(localStorage.getItem('usuario')).telefono , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
  });
  
  
  constructor(private updateService: UsuarioService, private router:Router) { }

  ngOnInit(): void { }


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
      telefono:     user.userPhone,
      idRol:        this.tipouser,
      id_rol:       this.tipouser,
      estado:       1
    }
    console.log('***' ,usuario);
    var res;

    this.updateService.updateUser(usuario).subscribe((data:string)=> {
      res = data;
      console.log("probando"+res);
      if(res === 'El usuario no existe'){        
        this.messageError = res;
        this.credentialsInvalid = true;
        setTimeout(() => {this.credentialsInvalid = false;},3500);
        return;
      }
      console.log(data, 'adentro');
      this.router.navigateByUrl('/perfil-cliente');
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
