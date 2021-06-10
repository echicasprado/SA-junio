import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {Router} from '@angular/router';

import { UsuarioService } from "../services/usuario.service";
import { usuario } from "../models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string = 'correo@gmail.com';
  pass: string = '1234';
  credentialsInvalid: boolean = false;
  messageError: string = '';

  constructor(private loginService: UsuarioService, private router:Router) {}
  
  ngOnInit(): void {}

  myForm = new FormGroup({
    userEmail: new FormControl("", [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(35),
      Validators.email
    ]),
    userPass: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
  });

  onSubmit(): void {
    const user = this.myForm.value;
    if(user.userEmail === ''  || user.userPass === ''){
      this.credentialsInvalid = true;
      this.messageError = 'Faltan campos a ingresar';
      setTimeout(() => {this.credentialsInvalid = false;},3500);
      return;
    }
    console.log(this.myForm.value);
    this.loginService.postLogin(user.userEmail , user.userPass).subscribe((data: {msg:string})=> {      
      console.log(data);
      if(data.msg === 'false'){        
        this.messageError = 'Credenciales invalidas';
        this.credentialsInvalid = true;
        setTimeout(() => {this.credentialsInvalid = false;},3500);
        return;
      }
      this.loginService.getUser(user.userEmail).subscribe((data: any)=> { 
        const user: usuario = data[0]; 
        console.log('######### ',user)
        localStorage.setItem('usuario', JSON.stringify(user));
        localStorage.removeItem('productoscarrito');
        if(user.idRol == 1 || user.idRol == 2)
          this.router.navigateByUrl('/admin')
        else
          this.router.navigateByUrl('/');
      },error => {
        this.messageError = 'Problemas en la conexión';
        this.credentialsInvalid = true;
        console.log(error);
        setTimeout(() => {this.credentialsInvalid = false;},3500);
      });
    }, error => {
      if (error.status == 401 || error.status == 402)    
        // this.messageError = error.error.message;
        this.messageError = 'Credenciales invalidas';
      else         
        this.messageError = 'Problemas en la conexión';
      this.credentialsInvalid = true;
      console.log(error);
      setTimeout(() => {this.credentialsInvalid = false;},3500);
    })
      
  }
}
