import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { usuario } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = "http://34.134.68.224/:47001";

/*
  API_URI = "http://35.239.187.92:4040";
  API_URI2 = "http://35.239.187.92:4041";
  API_URI3 = "http://35.239.187.92:4043";*/

  tokenFromUI: string = "SA-Encryption";

  constructor(private http: HttpClient, private route: Router) { }

  postLogin(correo:String, contrasena: string) {
    const encriptada = this.encryptUsingAES256(this.tokenFromUI, contrasena);
    // console.log(encriptada)
    // console.log(this.decryptUsingAES256(this.tokenFromUI, encriptada))
    return this.http.post(`${this.API_URI}/Login`, {  "user": correo, "password": encriptada});
  }

  // getUser(correo: string){
  //   return this.http.post(`${this.API_URI}/user-data/get-data-user`, {correo: correo});
  // }

  postRegistro(usuario: usuario){    
    const encriptada = this.encryptUsingAES256(this.tokenFromUI,  usuario.password.toString());
    usuario.password = encriptada;
console.log(usuario)
    return this.http.post(`${this.API_URI}/Registro`, usuario);
  }

  estaLog():Boolean{
    return !!localStorage.getItem('usuario');
  }

  logOut(){
    localStorage.removeItem('usuario');
    this.route.navigate(['/login']);
  }

  claseUser():number {
    const item = localStorage.getItem('usuario');
    const usuario: usuario =  item == undefined ? null : JSON.parse(item);
    if(item==null || usuario.idRol===3){
      return 3;
    }
    return 1;
  }

  encryptUsingAES256(tokenFromUI: string, request: string):string {
    let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(request), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }
  decryptUsingAES256(tokenFromUI: string, encrypted: string) {
    let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);

    return CryptoJS.AES.decrypt(
      encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }
}
