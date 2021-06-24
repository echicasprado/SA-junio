import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { log } from '../models/log';
import { URLs } from '../urls/urls';

@Component({
  selector: 'app-log-editorial',
  templateUrl: './log-editorial.component.html',
  styleUrls: ['./log-editorial.component.css']
})
export class LogEditorialComponent implements OnInit {

  myURL = new URLs();
  url_get: string = this.myURL.url_getBitacora;
  public lista_log: log[]  = [];
  error;

  constructor(private http: HttpClient, private router : Router) { 

    this.http.get(this.url_get).subscribe((data:log[])=> {//data es la respuesta
      this.lista_log = data;


    },error => this.error = error);

  }

  ngOnInit(): void {
    try{
      var u = localStorage.getItem('usuario');
      var usuario = JSON.parse(u);
      if(usuario.id_rol != 1){
        this.router.navigate(["denegado"]);
      }
    } catch(error){
      this.router.navigate(["denegado"]);
    }
  }

}
