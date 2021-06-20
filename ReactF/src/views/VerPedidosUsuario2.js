import React from "react";
import { URL } from '../variables/rutas';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  CardImg,
  CardSubtitle,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  useState,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";

import 'toastr/build/toastr.min.css'
import toastr from 'toastr'





//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class VerPedidoUsuario2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      setOpen: false,
      detallePedidos: [{ precio: 0, producto_nombre: "", cantidad: 0 }],
      abrir: false,
      //pedido_aux:0
    };

    this.obtenerTablaPedidos = this.obtenerTablaPedidos.bind(this);
    this.obtenerPedidos2 = this.obtenerPedidos2.bind(this);
    this.modificarEstado = this.modificarEstado.bind(this);
    this.detallePedido = this.detallePedido.bind(this);
    this.detallePedido2 = this.detallePedido2.bind(this);
    this.obtenerTablaPedidos();
    //this.obtenerPedidos();
    //this.guardarBodega = this.guardarBodega.bind(this);
    //this.modificarBodega = this.modificarBodega.bind(this);
  }
  abrirModal = (usuario, pedido) => {
    this.setState({ abrir: true });
    this.detallePedido(pedido, usuario)
  }
  cerrarModal = () => {
    this.setState({ abrir: !this.state.abrir });
  }
  detallePedido(pedido, usuario) {//,arr){
    fetch(`${URL.pedidos}/detallePedido`, {
      method: 'POST',
      body: JSON.stringify({
        pedido_usuario: usuario,
        pedido_id: pedido
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    })
      .then(
        response => {
          this.detallePedido2(response)//,arr)
          //let respuesta = response.json();
          //var arr2 = respuesta[0]
          //console.log(arr2);

        }

      ).then(

      )
      .catch(error => console.log(error));
  }
  async detallePedido2(response) {//,arr){
    let respuesta = await response.json();
    console.log(respuesta);
    this.state.detallePedidos = respuesta;
    //this.state.detallePedidos.push(respuesta[0])
    //arr.detallePedido=arr2;
  }
  obtenerTablaPedidos() {
    console.log("entra 2");
    var usu = JSON.parse(localStorage.getItem('current'))

    fetch(`${URL.pedidos}/pedidoTablaUsuario`, {
      method: 'POST',
      body: JSON.stringify({
        pedido_usuario: usu.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    })
      .then(
        response => this.obtenerPedidos2(response)

      ).catch(error => console.log(error));

  }

  async obtenerPedidos2(response) {
    let respuesta = await response.json();

    var arr2 = respuesta[0]
    console.log(arr2);

    for (let i = 0; i < arr2.length; i++) {
      console.log("for")
      arr2[i].detallePedido = [];
      await this.detallePedido(arr2[i].pedido_id, arr2[i].usuario_id, arr2[i])
    }
    this.setState({ pedidos: arr2 });
    console.log(this.state.pedidos)

  }



  modificarEstado(i, objeto) {
    var estado = document.getElementById('estado' + i);

    if (estado != objeto.pedido_estado) {
      try {
        let num = parseInt(estado);

        fetch(`${URL.pedidos}/modificarOrden`, {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors'
          }
        })
          .then(
            response => { alert("Modificado"); window.location.reload(); }

          ).catch(error => console.log(error));

      } catch (error) {
        alert("Debe ingresar un número");
      }
    } else {
      alert("El estado es el mismo");
    }


  }

  cancelarPedido(pedido) {
    console.log(pedido.pedido_id + " " + pedido.total + " " + pedido.direccion);
    //id, total, enviar, estado, direccion

    fetch(`${URL.pedidos}/modificarOrden`, {
      method: 'PUT',
      body: JSON.stringify({
        id: pedido.pedido_id,
        total: pedido.total,
        enviar: false,
        estado: 5,
        direccion: pedido.direccion
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    }).then(res=>res.json())
      .then(
        function (response) {
          console.log(response)
          toastr.options = {
            positionClass: 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 60000
          }
          toastr.clear()
          setTimeout(() => toastr.success(`Se canceló la orden`), 300)
          window.location.reload()
        }

      ).catch(error => console.log(error));

  }



  render() {

    return (
      <>
        <div className="content">


          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h1">Pedidos</CardTitle>
                </CardHeader>
                <CardBody>

                  <Row>


                    <br />
                    <br />
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Id Pedido</th>
                          <th>Fecha</th>
                          <th>Direccion</th>
                          <th>Estado</th>

                          <th>Total</th>
                          <th>Detalle</th>
                          <th>Cancelar</th>

                        </tr>
                      </thead>
                      <tbody>


                        {
                          this.state.pedidos.map((pedido, i) => {

                            return (

                              <tr>
                                <th>{pedido.pedido_id}</th>
                                <th>{pedido.fecha}</th>
                                <th>{pedido.direccion}</th>
                                <th>{pedido.estado}</th>

                                <th>{pedido.total}</th>
                                <th><Button color="info" onClick={e => this.abrirModal(pedido.usuario_id, pedido.pedido_id)}>Ver</Button></th>
                                <th><Button color="danger" onClick={e => this.cancelarPedido(pedido)}>X</Button></th>

                              </tr>
                            );

                          })

                        }


                      </tbody>
                    </Table>
                  </Row>

                </CardBody>

              </Card>
            </Col>
          </Row>
        </div>

        <Modal isOpen={this.state.abrir}>
          <ModalHeader>
            Detalle del Pedido
        </ModalHeader>
          <ModalBody>
            <Table responsive>
              <thead >
                <tr bgcolor="green">
                  <th bgcolor="green">Nombre</th>
                  <th bgcolor="green">Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {
                  //this.state.pedidos[this.state.pedido_aux].detallePedidos.map((producto, i) => {
                  this.state.detallePedidos.map((producto, i) => {
                    return (

                      <tr>
                        <th >{producto.producto_nombre}</th>
                        <th>{producto.precio}</th>
                        <th>{producto.cantidad}</th>
                      </tr>
                    );

                  })
                }
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.cerrarModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default VerPedidoUsuario2;
