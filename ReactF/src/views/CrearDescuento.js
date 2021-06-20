import React from "react";
import {URL} from '../variables/rutas';
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


class CrearDescuento extends React.Component {

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
      id:0
    };

    this.notify=this.notify.bind(this);
    this.guardar = this.guardar.bind(this);
    this.guardar2 = this.guardar2.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerProductos2 = this.obtenerProductos2.bind(this);
    this.obtenerProductos();
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
    console.log(respuesta.data);
    if (respuesta.estado === 200) {
      console.log(respuesta.data[0]);
      this.setState({ productos: respuesta.data[0] });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }
guardar2(item){
console.log(item)
  this.setState({ id:Number(item) });
}

  

  async guardar() {


    let usuario = JSON.parse(localStorage.getItem('current'));
    console.log(usuario);
    let descu = document.getElementById('txtDesc');

    fetch(`${URL.descuentos}/descuento`, {
      method: 'POST',
      body: JSON.stringify({
        "producto_id": this.state.id,
        "descuento": descu.value,
        "tiene_descuento": true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        if (respuesta[0][0].codigo === 200) {

          alert(respuesta[0][0].mensaje);
        } else {
          alert(respuesta[0][0].mensaje);
        }

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
                  <h5 className="title">Registrar Descuento</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Input
                            type="hidden"
                            id="txtID"
                            value=''
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Producto</label>
                          <Input type="select" name="select" id="idselect" onChange={(event) => this.guardar2(event.target.value)} >
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
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Descuento (%)</label>
                          <Input
                            placeholder="Descuento"
                            type="number"
                            id="txtDesc"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardar}>
                    Registrar Descuento
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

export default CrearDescuento;
