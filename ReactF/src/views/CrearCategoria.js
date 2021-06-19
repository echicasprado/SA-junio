import React from "react";
import { URL } from '../variables/rutas';
import {
  Card,
  CardSubtitle,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge
} from "reactstrap";


class CrearCatgoria extends React.Component {

  notify(type, message) {

    var options = {};

    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      categorias: [],
      abrirc: false,
      abrira: false,
      producto:0,
      categoria:0
    };

    this.notify = this.notify.bind(this);
    this.createCat = this.createCat.bind(this);
    this.asigCat = this.asigCat.bind(this);
    this.guardarCat = this.guardarCat.bind(this);
    this.guardarPro = this.guardarPro.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerProductos2 = this.obtenerProductos2.bind(this);
    this.obtenerCategorias = this.obtenerCategorias.bind(this);
    this.obtenerCategorias2 = this.obtenerCategorias2.bind(this);
    this.obtenerCategoriasPro = this.obtenerCategoriasPro.bind(this);
    this.obtenerProductos();
    this.obtenerCategorias();
  }
  obtenerProductos() {

    let usuario = JSON.parse(localStorage.getItem('current'));

    fetch(`${URL.obtener_producto}/producto/obtener_productos_user`, {
      method: 'POST',
      body: JSON.stringify({
        "id": usuario.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        response => this.obtenerProductos2(response)

      ).catch(error => console.log(error));
  }

  async obtenerProductos2(response) {
    let respuesta = await response.json();
    var arr2 = respuesta.data[0]
    console.log(arr2);

    for (let i = 0; i < arr2.length; i++) {
      arr2[i].categorias = [];
      await this.obtenerCategoriasPro(arr2,arr2[i].id)
    }
    this.setState({ productos: arr2 });
    console.log(this.state.productos)

  }
  obtenerCategoriasPro(array,id) {//,arr){
    fetch(`${URL.categorias}/categorias/productos`, {
      method: 'POST',
      body: JSON.stringify({
        producto:  id
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    })
      .then(
          response => response.json()

      ).then(
        function(response){
          console.log(response)
          array.categorias=response
        }
      )
      .catch(error => console.log(error));
  }
  obtenerCategorias() {

    fetch(`${URL.categorias}/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        response => this.obtenerCategorias2(response)

      ).catch(error => console.log(error));
  }

  async obtenerCategorias2(response) {

    let respuesta = await response.json();
    this.setState({ categorias: respuesta })
    console.log(respuesta);

  }
  cModalCreate = () => {
    this.setState({ abrirc: !this.state.abrirc });
  }
  cModalAsig = () => {
    this.setState({ abrira: !this.state.abrira });
  }
  guardarPro(item) {
    console.log(item)
    this.setState({ producto: Number(item) });
  }
  guardarCat(item) {
    console.log(item)
    this.setState({ categoria: Number(item) });
  }

  async createCat() {

    let usuario = JSON.parse(localStorage.getItem('current'));
    console.log(usuario);
    let categ = document.getElementById('txtCat');

    fetch(`${URL.categorias}/categorias`, {
      method: 'POST',
      body: JSON.stringify({
        "categoria": categ.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        this.obtenerCategorias();
        alert("Creado con Exito")

      }


      ).catch(error => { alert("No se pudo hacer la operacion"); console.log(error) });

  }
  async asigCat() {
    if(this.state.categoria==0|| this.state.producto == 0){
      alert("Seleccionar todos los campos")
      return
    }
    fetch(`${URL.categorias}/categorias/asig`, {
      method: 'POST',
      body: JSON.stringify({
        "categoria":this.state.categoria,
        "producto": this.state.producto
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        alert("Creado con Exito")

      }


      ).catch(error => { alert("No se pudo hacer la operacion"); console.log(error) });

  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <h1 className="title">Categorias</h1>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <Button className="btn-fill" color="primary" type="submit" onClick={this.cModalCreate}>
                        Crear Categoria
                  </Button>
                      <Button className="btn-fill" color="primary" type="submit" onClick={this.cModalAsig}>
                        Asignar Categoria
                  </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div>
                        {
                          this.state.categorias.map((categoria, i) => {
                            return (
                              <Badge pill variant="warning">{categoria.categoria}</Badge>
                            );
                          })
                        }
                      </div>
                    </Col>
                  </Row>

                </CardHeader>
                <CardBody>
                  <Row>
                    {
                      this.state.productos.map((producto, i) => {
                        return (
                          <Col xs={12} xl={4}>
                            <Card>
                              <CardBody>
                                <CardHeader>
                                  {
                                    producto.categorias.map((categoria,i)=>{
                                      return(
                                        <Badge pill variant="warning">{categoria}</Badge>
                                      )
                                      
                                    })
                                  }
                                </CardHeader>
                                <CardTitle tag="h3">{producto.nombre}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Precio</CardSubtitle>
                                <CardText >{producto.precio}</CardText>
                              </CardBody>
                            </Card>
                          </Col>

                        );
                      })
                    }

                  </Row>
                </CardBody>
                <CardFooter>

                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>


        <Modal isOpen={this.state.abrirc}>
          <ModalHeader>
            Crear Categoria
        </ModalHeader>
          <ModalBody>
            <Card bg="primary" text="white">
              <CardBody>
                <FormGroup>
                  <CardText style={{ color: 'white' }}>Nombre de la Categoria</CardText>
                  <Input placeholder="Nombre de la categoria" type="text" id="txtCat" />
                </FormGroup>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createCat}>Crear Categoria</Button>
            <Button color="secondary" onClick={this.cModalCreate}>Cerrar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.abrira}>
          <ModalHeader>
            Asignar Categoria
        </ModalHeader>
          <ModalBody>
            <Card bg="primary" text="white">
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Producto</label>
                        <Input type="select" name="select" id="idselect" onChange={(event) => this.guardarPro(event.target.value)} >
                          <option value={0} selected>Elegir Producto</option>
                          {
                            this.state.productos.map((producto, i) => {
                              return (
                                <option value={producto.id}>{producto.nombre}</option>
                              );
                            })
                          }
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Categoria</label>
                        <Input type="select" name="selectcat" id="idselectc" onChange={(event) => this.guardarCat(event.target.value)} >
                          <option value={0} selected>Elegir Categoria</option>
                          {
                            this.state.categorias.map((categoria, i) => {
                              return (
                                <option value={categoria.id}>{categoria.categoria}</option>
                              );
                            })
                          }
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.asigCat}>Asignar Categoria</Button>
            <Button color="secondary" onClick={this.cModalAsig}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default CrearCatgoria;
