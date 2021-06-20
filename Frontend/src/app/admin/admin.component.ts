import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { producto, Categoria, productoE } from '../models/producto';
import { ProductoService } from "../services/producto.service";
import { usuario } from "../models/user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showAlert = false;
  tipoAlert = 'success';
  messageError = '';
  imagen = '';
  imag64: string = '';
  listado: producto[] = [];
  listadoCategorias: Categoria[] = [];

  myForm = new FormGroup({
    nombre: new FormControl("", [ Validators.required,  Validators.minLength(2)]),
    precio: new FormControl("", [Validators.required]),
    cantidad: new FormControl("", [Validators.required]),
    descripcion: new FormControl("", [ Validators.required,  Validators.minLength(2)]),
    id_categoria: new FormControl(''),
  });

  constructor(private modal:NgbModal, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.messageError = '';
    this.imagen = '';
    this.imag64 = '';
    
    const item = localStorage.getItem('usuario');
    const usuario: usuario =  item == undefined ? null : JSON.parse(item);
    this.productoService.getProductos(usuario.id).subscribe((data: any)=> {
      this.listado = data.datos;
      console.log(this.listado)
    },error => {
      console.log(error);
    });
    this.productoService.getCategorias().subscribe((data: any)=> {
      this.listadoCategorias = data.datos;
      console.log(this.listadoCategorias)
    },error => {
      console.log(error);
    });
  }
 


  crearProducto(){
    const item = localStorage.getItem('usuario');
    const usuario: usuario =  item == undefined ? null : JSON.parse(item);
    const productoEnviar:producto = this.myForm.value;
    if(this.imagen === '')
      delete productoEnviar.imagen_base64
    else
      productoEnviar.imagen_base64 = this.imagen;
    productoEnviar.id = usuario.id;
    productoEnviar.id_categoria = Number(productoEnviar.id_categoria || 1);
    productoEnviar.id_restaurante = 1;
    console.log(productoEnviar);

    this.productoService.postProducto(productoEnviar).subscribe((data: any)=> {
      console.log(data)
      this.showAlert = true;
      this.tipoAlert = 'info';
      this.messageError = data.mensaje;
      setTimeout(() => {this.showAlert = false;},3500);      
      this.myForm.reset();
      this.myForm = new FormGroup({
        nombre: new FormControl("", [ Validators.required,  Validators.minLength(2)]),
        precio: new FormControl("", [Validators.required]),
        cantidad: new FormControl("", [Validators.required]),
        descripcion: new FormControl("", [ Validators.required,  Validators.minLength(2)]),
        id_categoria: new FormControl('', [ Validators.required]),
      });
    },error => {
      console.log(error);
      this.showAlert = true;
      this.tipoAlert = 'danger';
      this.messageError = 'Error al ingresar producto.';      
      setTimeout(() => {this.showAlert = false;},3500);
    });


  }


  openCentrado(contenido){
    this.modal.open(contenido,{centered:true});
  }
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

  myFormEditar = new FormGroup({
    id_producto: new FormControl('-1', [ Validators.required]),
    nombre: new FormControl(""),
    precio: new FormControl(""),
    cantidad: new FormControl(""),
    descripcion: new FormControl(""),
    id_categoria: new FormControl(''),
  });
  prodEditar: producto;
  capturar(form:FormGroup) {
    const idSelect = form.value.id_producto;
    const resultado = this.listado.find( produc => produc.id.toString() === idSelect );
    this.prodEditar = resultado;
   
    console.log('resullll> ',this.prodEditar)
  }
  
  editarProducto(){    
    const item = localStorage.getItem('usuario');
    const usuario: usuario =  item == undefined ? null : JSON.parse(item);
    let resultado:productoE = {
      id_producto:             this.prodEditar.id,
      id_usuario:      usuario.id,
      nombre:         this.myFormEditar.value.nombre !== '' ? this.myFormEditar.value.nombre : this.prodEditar.nombre,
      precio:         this.myFormEditar.value.precio !== '' ? Number(this.myFormEditar.value.precio) : this.prodEditar.precio,
      imagen_base64:  this.imagen === '' ? null : this.imagen,
      descripcion:    this.myFormEditar.value.descripcion !== '' ? this.myFormEditar.value.descripcion : this.prodEditar.descripcion,
      cantidad:       this.myFormEditar.value.cantidad !== '' ? Number(this.myFormEditar.value.cantidad) : this.prodEditar.cantidad,
      id_restaurante: 1,
      id_categoria: this.myFormEditar.value.id_categoria !== '' ? Number(this.myFormEditar.value.id_categoria) : this.prodEditar.id_categoria,
    };
    console.log(resultado);

    this.productoService.putProducto(resultado).subscribe((data: any)=> {
      console.log(data)
      this.showAlert = true;
      this.tipoAlert = 'info';
      this.messageError = data.mensaje;
      setTimeout(() => {this.showAlert = false;},3500);
      this.prodEditar = undefined;
      this.myFormEditar.reset();
      this.myFormEditar =  new FormGroup({
        id_producto: new FormControl('-1', [ Validators.required]),
        nombre: new FormControl(""),
        precio: new FormControl(""),
        cantidad: new FormControl(""),
        descripcion: new FormControl(""),
        id_categoria: new FormControl(''),
      });
    },error => {
      console.log(error);
      this.showAlert = true;
      this.tipoAlert = 'danger';
      this.messageError = 'Error al editar producto.';      
      setTimeout(() => {this.showAlert = false;},3500);
    });


  }

  myFormEliminar = new FormGroup({
    id_producto: new FormControl('-1', [ Validators.required]),
  });

  eliminarProducto(){
    const item = localStorage.getItem('usuario');
    const usuario: usuario =  item == undefined ? null : JSON.parse(item);
    let enviar = {
      id_usuario: usuario.id,
      id_producto: Number(this.myFormEliminar.value.id_producto)
    }
    console.log('eliminar', enviar);
    console.log('eliminar user', enviar.id_usuario);

    this.productoService.deleteProducto(enviar).subscribe((data: any)=> {
      this.showAlert = true;
      this.tipoAlert = 'info';
      this.messageError = data.mensaje;
      setTimeout(() => {this.showAlert = false;},3500);      
      this.myFormEliminar.reset();
      this.myFormEliminar = new FormGroup({
        id_producto: new FormControl('-1', [ Validators.required]),
      });
    },error => {
      console.log(error);
      this.showAlert = true;
      this.tipoAlert = 'danger';
      this.messageError = 'Error al eliminar producto.';      
      setTimeout(() => {this.showAlert = false;},3500);
    });


  }

  
}
