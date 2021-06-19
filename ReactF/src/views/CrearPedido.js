/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class CrearPedido extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      ListaCarrito: [],
      productos: [],
      allowCustom: true,
      abrir:false,
      producto:{}
    };



    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerProductos2 = this.obtenerProductos2.bind(this);
    this.agregarCarrito = this.agregarCarrito.bind(this);
    this.onChange = this.onChange.bind(this);
    this.generarCompra = this.generarCompra.bind(this);
    this.quitarCarrito=this.quitarCarrito.bind(this);
    this.obtenerProductos();
    //this.guardarBodega = this.guardarBodega.bind(this);
    //this.modificarBodega = this.modificarBodega.bind(this);
  }

  onChange(event) {
    console.log(event.target.checked)
    this.setState({
      allowCustom: event.target.checked,
    });
  }
  cModal=()=>{
    this.setState({abrir:!this.state.abrir});
  }
  obtenerProducto(item,index){
    item.i=index;
    this.setState({producto:item});
    this.setState({abrir:true});
  }

  obtenerProductos() {



    fetch(`${URL.obtener_producto}/producto/obtener_productos`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    })
      .then(
        response => this.obtenerProductos2(response)

      ).catch(error => console.log(error));





  }

  async obtenerProductos2(response) {

    let respuesta = await response.json();
    console.log(respuesta.data);
    if (respuesta.estado === 200) {
      console.log(respuesta.data[0]);
      this.setState({ productos: respuesta.data[0] });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }


  agregarCarrito(i) {
    
    var cantidad = document.getElementById('cant' + i);
    var boton = document.getElementById('butt' + i);
    if(cantidad.value==""){
      cantidad.value=1;
    }
    var objeto = this.state.productos[i];

    var js = { "id_producto": objeto.id, "nombre": objeto.nombre, "descripcion": objeto.descripcion, "cantidad": cantidad.value, "precio": parseInt(cantidad.value) * parseInt(objeto.precio),"posicion_producto":i };

    //this.state.ListaCarrito.push(js);
    var lista = this.state.ListaCarrito;
    lista.push(js);
    this.setState({ ListaCarrito: lista });
    cantidad.value = "";
    cantidad.disabled = true;

    boton.disabled = true;
    console.log(this.state.ListaCarrito);

    if(this.state.abrir){this.cModal()}


  }


  generarCompra() {


    var usu = JSON.parse(localStorage.getItem('current'))
    var direc = document.getElementById('txtDireccion').value;
    var arr = this.state.ListaCarrito;
    //console.log(this.state.allowCustom);
    console.log(usu);
    console.log(direc);
    var id_usuario = 1;
    if (usu != null) {
      id_usuario = usu.id;
    }


    fetch(`${URL.pedidos}/crearOrden`, {
      method: 'POST',
      body: JSON.stringify({
        pedido_usuario: id_usuario,
        enviar: this.state.allowCustom,
        direccion: direc
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta[0].id);




        try {


          for (let i = 0; i < arr.length; i++) {



            fetch(`${URL.pedidos}/detalleOrden`, {
              method: 'POST',
              body: JSON.stringify({
                "id": respuesta[0].id,
                "pedido_producto": arr[i].id_producto,
                "pedido_usuario": id_usuario,
                "cantidad": arr[i].cantidad
              }),
              headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors'
              }
            })
              .then(async function (response) {
                let respuesta = await response.json();
                console.log(respuesta);
                //alert("Producto agregado correctamente");
                window.location.reload();


              }


              ).catch(error => console.log(error));









          }
        } catch (error) {
          alert(error)
        }







      }


      ).catch(error => console.log(error));


  }

  quitarCarrito(posicion){
    var lista = this.state.ListaCarrito;
    let posicion_pr=lista[posicion].posicion_producto
    var cantidad = document.getElementById('cant' + posicion_pr);
    var boton = document.getElementById('butt' + posicion_pr);
    /*var lista_modificada=[];

    for(let i=0;i<lista.length;i++){
      if(i!=posicion){
        lista_modificada.push(lista[i])
      }
    }*/
    lista.splice(posicion,1);
    cantidad.disabled = false;
    console.log(cantidad)
    boton.disabled = false;
    this.setState({ ListaCarrito: lista });
  }


  render() {
    const allowCustom = this.state.allowCustom;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h1 className="title">Pedido</h1>
                </CardHeader>
                <CardBody>


                  <Row>
                    {
                      this.state.productos.map((producto, i) => {
                        return (


                          <Col xs={12} xl={4}>
                            <Card>
                              <CardBody>
                                <CardTitle tag="h3">{producto.nombre}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Precio</CardSubtitle>
                                <CardText >{producto.precio}</CardText>
                                <br />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Cantidad Pedido</CardSubtitle>

                                <Input type="text" id={"cant" + i} ></Input>
                                <Button id={"butt" + i} onClick={e => this.agregarCarrito(i)}>Agregar a Carrito</Button>
                                <Button id={"buttDe" + i} onClick={e => this.obtenerProducto(producto,i)}>Detalles</Button>
                              </CardBody>
                            </Card>
                          </Col>






                        );
                      })
                    }


                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Carrito</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Descripcion</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>

                      </tr>
                    </thead>
                    <tbody id="cuerpo">
                      {
                        this.state.ListaCarrito.map((producto, i) => {

                          return (


                            <tr>
                              <th>{producto.nombre}</th>
                              <th>{producto.cantidad}</th>
                              <th>{producto.descripcion}</th>
                              <th>{producto.precio}</th>
                              {/* Se usa el ()=> para que no se llame cuando se renderiza */}
                              <th><Button color="warning" onClick={()=>this.quitarCarrito(i)}>X</Button></th>
                            </tr>


                          );
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>

                <div className="example-config">
                  <input id="ac" type="checkbox" className="k-checkbox" onChange={this.onChange} checked={allowCustom} />
                  <label className="k-checkbox-label" for="ac">Enviar Pedido</label>
                </div>

                <Input
                  placeholder="Direccion de Entrega"
                  type="text"
                  id="txtDireccion"
                />

                <CardFooter><Button onClick={this.generarCompra}>Generar Compra</Button></CardFooter>
              </Card>
            </Col>
          </Row>
        </div>

        <Modal isOpen={this.state.abrir}>
        <ModalHeader>
        Detalle del Producto
        </ModalHeader>
        <ModalBody>
        <Card bg="primary" text="white">
          <CardImg top width="100%" src={this.state.producto.foto} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h3">{this.state.producto.nombre}</CardTitle>
            <Row>
              <Col>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Precio</CardSubtitle>
                <CardText style={{ color: 'white' }}>{this.state.producto.precio}</CardText>
              </Col>
              <Col>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Restaurante</CardSubtitle>
                <CardText style={{ color: 'white' }}>{this.state.producto.nombre_usuario}</CardText>
              </Col>
            </Row>
            <br></br>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Descripcion</CardSubtitle>
            <CardText style={{ color: 'white' }}>{this.state.producto.descripcion}</CardText>
          </CardBody>
        </Card>
        </ModalBody>
        <ModalFooter>
        <Button id={"buttD"+this.state.producto.i} onClick={e => this.agregarCarrito(this.state.producto.i)}>Agregar a Carrito</Button>
        <Button color="secondary" onClick={this.cModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </>
    );
  }
}

export default CrearPedido;
