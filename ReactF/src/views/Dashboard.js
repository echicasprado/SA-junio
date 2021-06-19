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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { URL } from '../variables/rutas';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardImg,
  CardSubtitle, CardText
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import { isObjectBindingPattern } from "typescript";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      productos: []
    };

    this.get_products = this.get_products.bind(this);
    this.get_products_2 = this.get_products_2.bind(this);

    this.get_products();
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  get_products() {

    fetch(`${URL.obtener_producto}/book/getBooks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      }
    }).then(res => res.json())
      .then(
      res => this.setState({ productos: res })
        // response => this.get_products_2(response)

      ).catch(error => console.log(error));

  }


  async get_products_2(response) {
    console.log(response);

    let respuesta = response;
    if (respuesta.estado === 200) {
      console.log(respuesta.data[0]);

      let arreglo = [];
      let usuario = JSON.parse(localStorage.getItem('current'));
      for (let i = 0; i < respuesta.data[0].length; i++) {
        let obj = respuesta.data[0][i]

        if (obj.tiene_descuento == 1 && obj.estado == 1) {
          arreglo.push(obj)
          console.log(obj);
        }

      }

      this.setState({ productos: arreglo });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Libreria ...</CardTitle>
                    </Col>

                  </Row>
                </CardHeader>
                <CardBody>


                </CardBody>
              </Card>
            </Col>
          </Row>







          <Row>
            {
              this.state.productos.map(producto => {
                return (



                  <Col lg="4">
                    <Card className="card-chart">
                      <CardHeader>
                        <CardTitle tag="h3">
                          <i className="tim-icons icon-shape-star text-danger" />{" "}
                                Q {producto.price}
                        </CardTitle>
                      </CardHeader>
                      <CardImg top width="100%" src={`data:image/jpeg;base64,${producto.coverPage}`} alt="Card image cap" />
                      <CardBody>

                        <CardTitle tag="h3">{producto.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Descripcion</CardSubtitle>
                        <CardText>{producto.description}</CardText>
                   



                      </CardBody>
                    </Card>
                  </Col>






                );
              })
            }

          </Row>


        </div>
      </>
    );
  }
}

export default Dashboard;
