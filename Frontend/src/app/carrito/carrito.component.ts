import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { URLs } from '../urls/urls';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public listacarrito = []
  public listacompra = []

  myURL = new URLs();
  url_compra: string = this.myURL.url_compra;
  error;


constructor(private http: HttpClient, private modal:NgbModal, private router : Router) { 
  
    this.listacarrito= JSON.parse(localStorage.getItem('productoscarrito'));
   
}
  

ngOnInit(): void {
  }
  

  quitarCarrito(pro){
    let listatemporal=[]
    this.listacarrito.forEach(element => {
      listatemporal.push(element)
      if(pro==element){
        listatemporal.pop()
      }
    });
    localStorage.setItem('productoscarrito', JSON.stringify(listatemporal));
    window.location.reload();
  }


//Crear una orden, se envía la factura al cliente a su correo
  crearPedido(estado){
    var res;
    let carrito = {};

    carrito = this.listacarrito.reduce((final,actual)=>{
      final.productos.push({nombre: actual.title, precio: actual.price})
      final.total = final.total + actual.price 
      return final
    },{productos: [], total:0, estado:estado, usuario:  JSON.parse(localStorage.getItem('usuario')).correo})

    console.log("Este es el json", carrito);

    this.http.post(this.url_compra, carrito).subscribe((data:[])=> {
      res = data;
      console.log("Valor de res", res);
      location.reload();
      alert('¡Compra realizada exitosamente!');
      },error => this.error = error); 
  }



}
