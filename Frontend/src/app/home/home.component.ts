import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { URLs } from '../urls/urls';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})


export class HomeComponent {
  
  public listaproductos = [] //esta ya no entra los que tiene stock en 0
  public listaproductos2 = [] //esta recibe todos
  myURL = new URLs();
  url: string = this.myURL.url;
  error;
  datos:any[]


  constructor(private http: HttpClient) {
   
    if(localStorage.getItem('productoscarrito')){
      this.listacarrito=JSON.parse(localStorage.getItem('productoscarrito'))
    }
    
    this.http.get(this.url).subscribe((data:any)=> {//data es la respuesta
      
      this.listaproductos2=data; //data.datos
      for (let elemento of this.listaproductos2) { 
        if( elemento.units!="0"){
          this.listaproductos.push(elemento)
        }
       }
     
      },error => this.error = error);
      
     
  
  }
   // <---
  
   public listacarrito = []
    mandarObjeto(pro) {   // <---
    this.listacarrito.push(pro)
    localStorage.setItem('productoscarrito', JSON.stringify(this.listacarrito));
    
  }



}
