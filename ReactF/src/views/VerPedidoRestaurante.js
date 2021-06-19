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
import { FormControl, ControlLabel } from "react-bootstrap";







//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class VerPedidoRestaurante extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      setOpen: false,
      detallePedidos: [{ precio: 0, producto_nombre: "", cantidad: 0 }],
      abrir: false,
      abrir2: false,
      estadoPedido: "",
      setEstadoPedido: 0,
      setStringEstado: "",
      openDropdown: false,
      pedidoModificar: {}
      //pedido_aux:0
    };

    this.obtenerTablaPedidos = this.obtenerTablaPedidos.bind(this);
    this.obtenerPedidos2 = this.obtenerPedidos2.bind(this);
    this.modificarEstado = this.modificarEstado.bind(this);
    this.detallePedido = this.detallePedido.bind(this);
    this.detallePedido2 = this.detallePedido2.bind(this);
    this.setTipo = this.setTipo.bind(this);
    this.setOpen = this.setOpen.bind(this)
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

  abrirModal2 = (estado, pedido) => {
    this.setState({ abrir2: true });
    this.setState({ estadoPedido: estado })
    this.setState({ pedidoModificar: pedido })

  }
  cerrarModal2 = () => {
    this.setState({ abrir2: !this.state.abrir2 });
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
    }).then(res => res)
      .then(
        response => {
          console.log(localStorage.getItem("current"))
          console.log(response);
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
    let current=JSON.parse(localStorage.getItem("current"))

    console.log(respuesta);
    for(let i=0;i<respuesta.length;i++){
      console.log("*************************************"+respuesta[i].usuario_id+" "+current.id)

      if(respuesta[i].usuario_id==current.id){
        console.log(respuesta[i])
      }
    }
    this.state.detallePedidos = respuesta;
    //this.state.detallePedidos.push(respuesta[0])
    //arr.detallePedido=arr2;
  }
  obtenerTablaPedidos() {
    console.log("entra 2");
    var usu = JSON.parse(localStorage.getItem('current'))

    fetch(`${URL.pedidos}/pedidoTablaRestaurante`, {
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
    console.log("----------------------------------------------------------");
    console.log(respuesta);

    for (let i = 0; i < arr2.length; i++) {
      console.log("for")
      arr2[i].detallePedido = [];
      await this.detallePedido(arr2[i].pedido_id, arr2[i].usuario_id, arr2[i])
    }
    this.setState({ pedidos: arr2 });
    console.log(this.state.pedidos)

  }


  setTipo(estado, string) {
    this.setState({ setEstadoPedido: estado })
    this.setState({ setStringEstado: string })

  }




  modificarEstado() {
    var pedido = this.state.pedidoModificar
    if (pedido.estado_id != this.state.setEstadoPedido) {

      console.log("Pedido Actual")
      console.log(pedido)
      console.log("nuevo Estado: "+this.state.setEstadoPedido)

      fetch(`${URL.pedidos}/modificarOrden`, {
        method: 'PUT',
        body: JSON.stringify({
          id: pedido.pedido_id,
          total: pedido.total,
          enviar: false,
          estado: this.state.setEstadoPedido,
          direccion: pedido.direccion
        }),
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        }
      })
        .then(
          response => {
            alert("Modificado");
            window.location.reload();
          }

        ).catch(error => console.log(error));


    } else {
      console.log("Mismo estado")
    }


  }


  setOpen() {
    this.setState({ openDropdown: !this.state.openDropdown })
  };



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
                          <th>Total</th>
                          <th>Detalle</th>
                          <th>Estado</th>

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
                                <th>{pedido.total}</th>
                                <th><Button color="danger" onClick={e => this.abrirModal(pedido.usuario_id, pedido.pedido_id)}>Ver Detalle</Button></th>
                                <th><Button color="info" onClick={e => this.abrirModal2(pedido.estado, pedido)}>Ver Estado</Button></th>

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




        <Modal isOpen={this.state.abrir2}>
          <ModalHeader>
            <ControlLabel style={{ fontWeight: "bold", fontSize: 24 }}>Estado Actual del Pedido: {this.state.estadoPedido}</ControlLabel>

          </ModalHeader>


          <ModalBody>



            <ControlLabel> Estado Nuevo del Pedido: {this.state.setStringEstado}</ControlLabel>
            <br />
            <ButtonDropdown isOpen={this.state.openDropdown} toggle={this.setOpen}>
              <DropdownToggle caret color="info">
                Estado
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.setTipo(1, "Nueva Orden")}>Nueva Orden</DropdownItem>
                <DropdownItem onClick={() => this.setTipo(2, "Preparación")}>Preparación</DropdownItem>
                <DropdownItem onClick={() => this.setTipo(3, "En Camino")}>En Camino</DropdownItem>
                <DropdownItem onClick={() => this.setTipo(4, "Entregado")}>Entregado</DropdownItem>
                <DropdownItem onClick={() => this.setTipo(5, "Cancelado")}>Cancelado</DropdownItem>
                <DropdownItem onClick={() => this.setTipo(6, "Pagado")}>Pagado</DropdownItem>

              </DropdownMenu>
            </ButtonDropdown>




          </ModalBody>



          <ModalFooter>
            <Button color="warning" onClick={this.modificarEstado}>Modificar Estado</Button>

            <Button color="secondary" onClick={this.cerrarModal2}>Cerrar</Button>
          </ModalFooter>
        </Modal>



















      </>
    );
  }
}

export default VerPedidoRestaurante;
