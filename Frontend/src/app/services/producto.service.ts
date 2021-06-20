import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { producto, productoE } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //API_URI = "http://35.239.187.92:4010";
  API_URI = "http://35.202.232.78:4010";

  constructor(private http: HttpClient, private route: Router) { }

  getProductos(id){
    return this.http.get(`${this.API_URI}/producto/leer-productos/1/${id}`);
  }

  getCategorias(){
    return this.http.get(`${this.API_URI}/producto/leer-categorias`);
  }

  postProducto(producto: producto){
    return this.http.post(`${this.API_URI}/producto/crear-producto`, producto);
  }

  putProducto(producto: productoE){
    return this.http.put(`${this.API_URI}/producto/editar-producto`, producto);
  }

  deleteProducto(producto){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: producto,
    };
    return this.http.delete(`${this.API_URI}/producto/eliminar-producto`, options);
  }
}
