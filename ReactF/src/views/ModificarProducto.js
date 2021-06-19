import React, { useState, setState } from "react";

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
  Col,
  CardImg,
  CardText,
  CardSubtitle,
} from "reactstrap";

import { FormControl, ControlLabel } from "react-bootstrap";

class ModificarProducto extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      nombre: '',
      descripcion: '',
      precio: 0,
      // categorias: []
    };
    // this.guardar = this.guardar.bind(this);
    // this.modificar = this.modificar.bind(this);
    // this.eliminar = this.eliminar.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeDescripcion = this.handleChangeDescripcion.bind(this);
    this.handleChangePrecio = this.handleChangePrecio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleChangeNombre(event) {
    // alert(event.target.value)
    this.setState({ nombre: event.target.value });
  }


  async handleChangeDescripcion(event) {
    // alert(event.target.value)
    this.setState({ descripcion: event.target.value });
  }

  async handleChangePrecio(event) {
    // alert(event.target.value)
    this.setState({ precio: event.target.value });
  }

  async handleSubmit(event) {

    console.log(event)
    // event.preventDefault();



    fetch(`${URL.modificar_producto}/producto/modificar_producto`, {
      method: 'POST',
      body: JSON.stringify({
        id: event.id,
        foto: event.foto,
        producto_usuario: event.producto_usuario,
        nombre: this.state.nombre != '' ? this.state.nombre : event.nombre,
        descripcion: this.state.descripcion != '' ? this.state.descripcion : event.descripcion,
        precio: this.state.precio != 0 ? this.state.precio : event.precio,
        estado: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    }).then(async function (response) {
      let respuesta = await response.json();
      alert(respuesta)
      // if(respuesta.estado === 200) {
      //   alert("Logged in");
      //   let val= respuesta.data;
      //   console.log(val[0]);
      //   localStorage.setItem('current', JSON.stringify(val[0]));
      //   history.push("/admin/dashboard");
      // }else{
      //   console.log(respuesta)
      //     alert("Error, credenciales invalidas");
      // } 

    });


  }



  async fetchData() {




    let response = await fetch(`${URL.obtener_producto}/producto/obtener_productos`);
    let dataProductos = await response.json();
    console.log(dataProductos.data[0])

    // console.log(dataProductos)

    // response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/categoria');
    // let dataCategorias = await response.json();
    // response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/detalle_producto');
    // let dataDetalleProductos = await response.json();

    // dataProductos.forEach(producto => {
    //   producto.categorias = []
    //   producto.detalleCategorias = ''
    //   dataDetalleProductos.forEach(detalle => {
    //     if(producto.id_producto === detalle.id_producto){
    //       for (let i = 0; i < dataCategorias.length; i++) {
    //         if(dataCategorias[i].id_categoria === detalle.id_categoria){
    //           producto.categorias.push(dataCategorias[i])
    //           producto.detalleCategorias += dataCategorias[i].nombre + "\n"
    //           break
    //         }
    //       }
    //     }
    //   });
    // });
    let arreglo = [];
    let usuario = JSON.parse(localStorage.getItem('current'));
    for (let i = 0; i < dataProductos.data[0].length; i++) {
      let obj = dataProductos.data[0][i]
      if (obj.producto_usuario == usuario.id) {
        arreglo.push(obj)
        console.log(obj);
      }
    }

    this.setState({ productos: arreglo, /*categorias: dataCategorias*/ });
  }

  componentWillMount() {
    this.fetchData();
  }


  async guardar() {
    let IDTxt = document.getElementById('txtID');
    let NombreTxt = document.getElementById('txtNombre');
    let PrecioTxt = document.getElementById('txtPrecio');
    let DescripcionTxt = document.getElementById('txtDescripcion');

    const status = await this.makeRequest({
      method: IDTxt.value === '' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: NombreTxt.value,
        descripcion: DescripcionTxt.value,
        precio: PrecioTxt.value,
      })
    }, IDTxt.value === '' ? '' : '/' + IDTxt.value);

    if (status === 404) console.log("Error")
    else this.fetchData();

    IDTxt.value = '';
    NombreTxt.value = '';
    PrecioTxt.value = '';
    DescripcionTxt.value = '';
  }

  modificar(id) {
    this.setState(state => {
      let IDTxt = document.getElementById('txtID');
      let NombreTxt = document.getElementById('txtNombre');
      let PrecioTxt = document.getElementById('txtPrecio');
      let DescripcionTxt = document.getElementById('txtDescripcion');


    });
  }

  // eliminar(id){
  //   console.log("eliminar " + id)
  // }

  // async makeRequest(request, param = ''){
  //   const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/producto' + param, request);
  //   return response.status;
  // }

  render() {
    return (
      <>
        <div className="content">
          <Row>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Productos</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Modificar</th>

                      </tr>
                    </thead>
                    <tbody>
                      {

                        this.state.productos.map(producto => {
                          return (
                            // <form onSubmit={this.handleSubmit}>


                            <tr key={producto.id_producto}>
                              <td>
                                <FormGroup>
                                  <label>Nombre</label>

                                  <Input
                                    placeholder="Nombreasd"
                                    type="text"
                                    defaultValue={producto.nombre}
                                    onChange={this.handleChangeNombre}
                                  />
                                </FormGroup>

                              </td>
                              <td>

                                <FormGroup>
                                  <label>Descripción</label>
                                  <FormControl
                                    // autoFocus
                                    type="text"
                                    defaultValue={producto.descripcion}
                                    onChange={this.handleChangeDescripcion}
                                  />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup>
                                  <label>Precio</label>
                                  <FormControl
                                    autoFocus
                                    type="number"
                                    defaultValue={producto.precio}
                                    onChange={this.handleChangePrecio}
                                  />
                                </FormGroup>
                              </td>
                              <td>
                                <br></br>
                                <img width="200" height="200" src={producto.foto} alt="Card image cap" />
                              </td>
                              <td>
                                <br></br>
                                <Button type="submit" value={producto} onClick={() => this.handleSubmit(producto)}>
                                  Modificar
                                  </Button>
                                {/* <input className="btn-fill" color="primary" type="submit" value="Submit" /> */}
                              </td>


                            </tr>
                            // </form>
                          );

                        })

                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>






          </Row>
        </div>
      </>
    );
  }
}

export default ModificarProducto;
