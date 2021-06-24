import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { log } from '../models/log';

@Component({
  selector: 'app-log-editorial',
  templateUrl: './log-editorial.component.html',
  styleUrls: ['./log-editorial.component.css']
})
export class LogEditorialComponent implements OnInit {

  url_get: string = 'http://34.69.133.221:47011/bitacora/getBitacora'
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
