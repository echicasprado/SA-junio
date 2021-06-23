import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { libro } from '../models/libro';
import { nuevo_libro } from '../models/libro';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  /*
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn': '' }
  */
})


export class LibrosComponent {
  
  showAlert = false;
  tipoAlert = 'success';
  messageError = '';
  imagen = '';
  imag64 = '';
  public listalibros: libro[] = []
  public lista_editorial: libro[] = []
  url: string = 'http://34.134.68.224:47005/book/getBooks';
  url_editar: string = 'http://34.134.68.224:47004/book/updateBook'
  url_eliminar: string = 'http://34.134.68.224:47003/book/deleteBook'
  url_crear: string = 'http://34.134.68.224:47002/book/addBook'
  url_newBitacora: string = 'http://localhost:5500/bitacora/newBitacora'
  error;
  datos:any[]

  constructor(private http: HttpClient, private modal:NgbModal, private router : Router) { 
    
    var u = localStorage.getItem('usuario');
    var usuario = JSON.parse(u);

    this.http.get(this.url).subscribe((data:libro[])=> {//data es la respuesta
      this.listalibros = data;
      this.lista_editorial = this.listalibros.filter(libro => libro.editorial == usuario.nombre)


      },error => this.error = error);
      
  }
   // <---
    
  ngOnInit(): void {
    try{
      var u = localStorage.getItem('usuario');
      var usuario = JSON.parse(u);
      if(usuario.id_rol != 2){
        this.router.navigate(["denegado"]);
      }
    } catch(error){

    }
    
  }
   
  myFormEditar = new FormGroup({
    _id: new FormControl(""),
    author: new FormControl(""),
    category: new FormControl(""),
    coverPage: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(""),
    title: new FormControl(""),
    units: new FormControl(""),
    editorial: new FormControl("")
  });

  myFormCrear = new FormGroup({
    author: new FormControl(""),
    category: new FormControl(""),
    coverPage: new FormControl(""),
    description: new FormControl(""),
    price: new FormControl(""),
    title: new FormControl(""),
    units: new FormControl(""),
    editorial: new FormControl("")
  });

  handleUpload(event) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const imagen: string = reader.result.toString();
        const sinMetadata: string = imagen.split(';base64,')[1];
        this.imagen = reader.result.toString();
        this.imag64 = sinMetadata;
    };
  }
  
  abrirCentrado(contenido){
    this.modal.open(contenido,{centered:true});
  }

  crear(abrir){
    this.abrirCentrado(abrir);
  }

  
  crearLibro(){
    var res;
    
    var creado = this.myFormCrear.value;

    if(this.imagen != ''){
      this.myFormCrear.setValue({
        "author": creado.author,
        "category": creado.category,
        "coverPage": this.imag64,
        "description": creado.description,
        "price": creado.price,
        "title": creado.title,
        "units": creado.units,
        "editorial": JSON.parse(localStorage.getItem('usuario')).nombre
      })
    }
    else
    {
      this.myFormCrear.setValue({
        "coverPage": '',
        "author": creado.author,
        "category": creado.category,
        "description": creado.description,
        "price": creado.price,
        "title": creado.title,
        "units": creado.units,
        "editorial": JSON.parse(localStorage.getItem('usuario')).nombre
      })
    }
    creado = this.myFormCrear.value;

    console.log("valor creado", creado);
    
    this.http.post(this.url_crear, creado).subscribe((data:libro[])=> {//data es la respuesta
      res = data;
      console.log("Valor de res", res)
      location.reload();
      },error => this.error = error); 

    this.imagen = '';
    this.imag64 = '';
  }

  borrarCrear(){

  }


  editar(libro, abrir){
    localStorage.setItem('producto', JSON.stringify(libro));

    this.myFormEditar.setValue({
        "_id": JSON.parse(localStorage.getItem('producto'))._id,
        "author": JSON.parse(localStorage.getItem('producto')).author,
        "category": JSON.parse(localStorage.getItem('producto')).category,
        "coverPage": JSON.parse(localStorage.getItem('producto')).coverPage,
        "description": JSON.parse(localStorage.getItem('producto')).description,
        "price": JSON.parse(localStorage.getItem('producto')).price,
        "title": JSON.parse(localStorage.getItem('producto')).title,
        "units": JSON.parse(localStorage.getItem('producto')).units,
        "editorial": JSON.parse(localStorage.getItem('producto')).editorial
    })

    this.abrirCentrado(abrir);

    console.log("Libro", libro)
    
  }

  editarLibro(){
    var editado = this.myFormEditar.value;
    var res;
    
    this.http.post(this.url_editar, editado).subscribe((data:libro[])=> {//data es la respuesta
      res = data;
      location.reload();
      },error => this.error = error); 
  }

  
  eliminarLibroStorage(){
    localStorage.removeItem('producto');
  }

  eliminarLibro(libro){
    var res;
    this.http.post(this.url_eliminar, libro).subscribe((data:[])=> {//data es la respuesta
      res = data;
      console.log("Valor de res", res);
      location.reload();
      },error => this.error = error);
  }

}
