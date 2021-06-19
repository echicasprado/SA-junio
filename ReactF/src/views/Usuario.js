import React from "react";

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
import { FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { URL } from '../variables/rutas';

class usuario extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      nUsuario: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      contrasena: '',
    };
    // this.guardar = this.guardar.bind(this);
    this.eliminar = this.eliminar.bind(this);




    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeApellido = this.handleChangeApellido.bind(this);
    this.handleChangeDireccion = this.handleChangeDireccion.bind(this);
    this.handleChangeTelefono = this.handleChangeTelefono.bind(this);
    this.handleChangeContrasena = this.handleChangeContrasena.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChangeUsuario(event) {
    this.setState({ nUsuario: event.target.value });
  }

  async handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  async handleChangeApellido(event) {
    this.setState({ apellido: event.target.value });
  }

  async handleChangeDireccion(event) {
    this.setState({ direccion: event.target.value });
  }

  async handleChangeTelefono(event) {
    this.setState({ telefono: event.target.value });
  }

  async handleChangeContrasena(event) {
    this.setState({ contrasena: event.target.value });
  }

  async handleSubmit() {

    // console.log(event)
    // event.preventDefault();

    let obj = JSON.stringify({
      id: this.state.usuario.id + "",
      estado: this.state.usuario.estado === 1,
      id_tipo_usuario: this.state.usuario.tipo_usuario + "",
      usuario: this.state.nUsuario != '' ? this.state.nUsuario : this.state.usuario.usuario,
      nombre: this.state.nombre != '' ? this.state.nombre : this.state.usuario.nombre,
      apellido: this.state.apellido != '' ? this.state.apellido : this.state.usuario.apellido,
      direccion: this.state.direccion != '' ? this.state.direccion : this.state.usuario.direccion,
      telefono: this.state.telefono != '' ? this.state.telefono : this.state.usuario.telefono,
      password: this.state.contrasena != '' ? this.state.contrasena : this.state.usuario.contrasenia,
    })

    let newUser = this.state.nUsuario != '' ? this.state.nUsuario : this.state.usuario.usuario
    let newPass = this.state.contrasena != '' ? this.state.contrasena : this.state.usuario.contrasenia
    console.log(obj)

    fetch(`${URL.modificar_usuario}/usuarios/modificar_usuario`, {
      method: 'POST',
      body: obj,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async function (response) {
      let respuesta = await response.json();

      console.log(respuesta)
      if (respuesta.estado === 200) {


        alert("Modificado Correctamente");
        // console.log(this.state.usuario)
        let aJsonObj = JSON.stringify({
          usuario: newUser,
          password: newPass
        })

        fetch(`${URL.login}:9007/usuarios/login`, {
          method: 'POST',
          body: aJsonObj,
          headers: {
            'Content-Type': 'application/json',
            'mode': 'no-cors'
          }
        })
          .then(async function (response) {
            let respuesta = await response.json();

            if (respuesta.estado === 200) {
              let val = respuesta.data;
              console.log(val[0]);
              localStorage.setItem('current', JSON.stringify(val[0]));

            } else {
              console.log(respuesta)
              alert("Error, credenciales invalidas");
            }

          });

      } else {
        console.log(respuesta)
        alert("Error, credenciales invalidas");
      }

    });


  }

  async fetchData() {
    let dataUsuario = JSON.parse(localStorage.getItem('current'))

    this.setState({ usuario: dataUsuario });
  }

  componentWillMount() {
    this.fetchData();
  }



  eliminar(id) {
    console.log("eliminar " + id)
  }



  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Modificar Usuario</h5>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Usuario</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.usuario['usuario']}
                          Change={this.handleChangeUsuario}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Nombre</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.usuario['nombre']}
                          onChange={this.handleChangeNombre}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Apellido</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.usuario['apellido']}
                          onChange={this.handleChangeApellido}
                        />
                      </FormGroup>
                    </Col>


                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Direccion</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.usuario['direccion']}
                          onChange={this.handleChangeDireccion}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Telefono</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="number"
                          defaultValue={this.state.usuario['telefono']}
                          onChange={this.handleChangeTelefono}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label>Contrasena</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          disabled
                          type="password"
                          defaultValue={this.state.usuario['contrasenia']}
                          onChange={this.handleChangeContrasena}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Guardar
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

export default usuario;
