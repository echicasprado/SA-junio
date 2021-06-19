import React from "react";
import { URL } from '../variables/rutas';
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
  Col
} from "reactstrap";

import 'toastr/build/toastr.min.css'
import toastr from 'toastr'
import './CrearProductos.css'

class CrearProductos extends React.Component {

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
      stringImage:URL.imagenDefecto,
      imageSrc: URL.imagenDefecto,
      imageName: "",
      loaded: true,
      tipoImg: "",
      productos: [],
      categorias: []

    };

    this.notify = this.notify.bind(this);
    this.guardar = this.guardar.bind(this);
    this.modificar = this.modificar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }





  async guardar() {
    let IDTxt = document.getElementById('txtID');
    let NombreTxt = document.getElementById('txtNombre');
    let PrecioTxt = document.getElementById('txtPrecio');
    let DescripcionTxt = document.getElementById('txtDescripcion');

    let usuario = JSON.parse(localStorage.getItem('current'));
    console.log(usuario);



    if (NombreTxt.value != "" && PrecioTxt.value != "" && DescripcionTxt.value != "") {

      let split = this.state.imageSrc.split(',');

      fetch(`${URL.ingresar_producto}/producto/crear_producto`, {
        method: 'POST',
        body: JSON.stringify({
          "nombre": NombreTxt.value,
          "precio": PrecioTxt.value,
          "foto": split[1],
          "usuario": usuario.id,
          "descripcion": DescripcionTxt.value,
          "extension": this.state.tipoImg
        }),
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        }
      })
        .then(async function (response) {
          let respuesta = await response.json();
          console.log(respuesta);
          if (respuesta.estado === 200) {


            NombreTxt.value = ''

            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000
            }
            toastr.clear()
            setTimeout(() => toastr.success(`Producto Creado Correctamente`), 300)
            // window.location.reload();
          } else {
            console.log(respuesta)
            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000
            }
            toastr.clear()
            setTimeout(() => toastr.warning(`Error al crear el producto`), 300)
          }

        }


        ).catch(error => console.log(error));


      IDTxt.value = '';
      NombreTxt.value = '';
      PrecioTxt.value = '';
      DescripcionTxt.value = '';
      document.getElementById('imagenProducto').value=null;
      this.setState({ imageSrc: this.state.stringImage });
    } else {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        hideDuration: 300,
        timeOut: 60000
      }
      toastr.clear()
      setTimeout(() => toastr.error(`Debe llenar todos los productos`), 300)
    }





  }

  modificar(id) {
    this.setState(state => {
      let IDTxt = document.getElementById('txtID');
      let NombreTxt = document.getElementById('txtNombre');
      let PrecioTxt = document.getElementById('txtPrecio');
      let DescripcionTxt = document.getElementById('txtDescripcion');

      for (let i = 0; i < state.productos.length; i++) {
        if (state.productos[i].id_producto === id) {
          IDTxt.value = state.productos[i].id_producto;
          NombreTxt.value = state.productos[i].nombre;
          PrecioTxt.value = state.productos[i].precio;
          DescripcionTxt.value = state.productos[i].descripcion;

          break;
        }
      }
    });
  }

  eliminar(id) {
    console.log("eliminar ")
    console.log(id)
  }


  onFileChange(e, file1) {
    console.log("on-file-change");
    var file = file1 || e.target.files[0],
      pattern = /image-*/,
      reader = new FileReader();
    console.log(file.name);
    console.log(file);
    if (!file.type.match(pattern)) {
      alert("Formato inválido");
      return;
    }
    var tipo = String(file.type)
    var separador = tipo.split("/")
    console.log(this);
    this.setState({ tipoImg: separador[1] });
    this.setState({ loaded: false });

    reader.onload = e => {

      this.setState({ imageSrc: reader.result });
      this.setState({ loaded: true });

      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }


  async makeRequest(request, param = '') {
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/producto' + param, request);
    return response.status;
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Crear Producto</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    {/* <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Input
                            type="hidden"
                            id="txtID"
                            value=''
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nombre</label>
                          <Input
                            placeholder="Nombre"
                            type="text"
                            id="txtNombre"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Precio</label>
                          <Input
                            placeholder="Precio"
                            type="text"
                            id="txtPrecio"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Descripción</label>
                          <Input
                            placeholder="Descripción"
                            type="text"
                            id="txtDescripcion"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">

                        <label>Fotografía del Producto</label>

                        <Input
                          type="file"
                          accept="image/*"
                          onChange={this.onFileChange}
                          id="imagenProducto"

                        />

                        <img src={this.state.imageSrc} width="300" height="300" alt='Imagen del Producto' />


                      </Col>
                    </Row>

                    <Row>
                      <Col>
         
                      </Col>
                    </Row>


                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" id="prBtn" color="primary" type="submit" onClick={this.guardar}>
                    Registrar Producto
                  </Button>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default CrearProductos;
