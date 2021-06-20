import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Orden } from '../models/orden';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  listado: Orden[] = [
    {id: 1, usuario: 'juano', direccion: 'zona 1', total: 12.45, fecha: '1/02/2020', estado: 'Nueva orden'},
    {id: 2, usuario: 'maria', direccion: 'zona 3', total: 12, fecha: '1/02/2020', estado: 'Nueva orden'},
    {id: 3, usuario: 'carla', direccion: 'zona 7', total: 32, fecha: '1/02/2020', estado: 'Nueva orden'},
    {id: 4, usuario: 'rober', direccion: 'zona 9', total: 44, fecha: '1/02/2020', estado: 'Nueva orden'},
    {id: 5, usuario: 'luis', direccion: 'zona 1', total: 142, fecha: '1/02/2020', estado: 'Nueva orden'},
    {id: 6, usuario: 'jose', direccion: 'zona 11', total: 32, fecha: '1/02/2020', estado: 'Nueva orden'},
  ];
  addId: number;
  addNumOrden: number;
  estadoNuevo: number;
  model = 1;

  constructor(private modal:NgbModal ) { }

  ngOnInit(): void {
  }

  openCentrado(contenido, idUsuario: number, numOrden: number){
    this.modal.open(contenido,{centered:true, size: 'sm'});
    this.addId = idUsuario;
    this.addNumOrden = numOrden;
  }

  cambiarEstado() {
    console.log('El idUsuario: ', this.addId, ' Estado: ', this.model)
  }

  eliminar(idList: number) {
    console.log('El id: ', idList)
  }



}
