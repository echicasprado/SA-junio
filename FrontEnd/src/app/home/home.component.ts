import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})


export class HomeComponent {
  
  public listaproductos = [] 
  url: string = 'http://35.202.232.78:4010/producto/leer-productos';
  error;
  datos:any[]
 

  constructor(private http: HttpClient) { 
    if(localStorage.getItem('productoscarrito')){
      this.listacarrito=JSON.parse(localStorage.getItem('productoscarrito'))
    }
   
    this.http.get(this.url).subscribe((data:any)=> {//data es la respuesta
      this.listaproductos=data.datos;
      },error => this.error = error);
      
  }
   // <---
  
   public listacarrito = []
    mandarObjeto(pro) {   // <---
    this.listacarrito.push(pro)
    localStorage.setItem('productoscarrito', JSON.stringify(this.listacarrito));
    
  }



}
