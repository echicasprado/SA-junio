import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public listacarrito = []
  constructor() { 
  
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

}
