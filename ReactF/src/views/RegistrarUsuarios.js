import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import md5 from 'md5';
import NotificationAlert from "react-notification-alert";
import {URL} from '../variables/rutas';
import * as CryptoJS from 'crypto-js';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  CardFooter,
  Input,
  Row,
  Col,
  CardImg,
  CardSubtitle,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

let tokenFromUI = "SA-Encryption";


export default function RegistrarUsuarios() {

  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const history = useHistory();

  function validateForm(e) {
    //return email.length > 0 && password.length > 0;
    console.log(e);
  }

  function notificaciones(type, message) {
    var options = {};

    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert(options);
  }

  async function encryptUsingAES256 (tokenFromUI, request) {
    let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(request), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }


  async function handleSubmit(event) {
    event.preventDefault();

    const encrypted = encryptUsingAES256(tokenFromUI, password);

    console.log(usuario);
    console.log(nombre);
    console.log(apellido);
    console.log(direccion);
    console.log(tipo);
    console.log(encrypted);

    // {
    // "nombre": "Alejandro",
    // "apellido": "Rodriguez",
    // "correo": "123456789@gmail.com",
    // "password": "1234",
    // "telefono": 1234,
    // "id_rol": 1,
    // "estado": 1
    // }

    if(tipo==3 || tipo==2 || tipo==1){
      fetch(`${URL.crear_usuario}/Registro`, {
        method: 'POST',
        body: JSON.stringify({
        
          nombre: nombre,
          apellido: apellido,
          correo: usuario,
          password: await encryptUsingAES256(tokenFromUI, password),
          editorial: "editorial 1",
          telefono: telefono,
          id_rol: tipo,
          estado: 1

        }),
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        }
      })
      .then(async function (response) {
        let respuesta = await response.json();
        
        if (respuesta.estado) {
          alert("Usuario creado correctamente");
          history.push("/login");
        } else {
          console.log(respuesta)
          alert(respuesta.mensaje);
        }
      })
      .catch(error => console.log(error));
    }else{
      alert("Se debe elegir un tipo de usuario")
    }



  }


  function select(event) {
    
      console.log(event.target.innerText)
    
  }





  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP!</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresa tus datos para registrarte</h5>
      <br></br>
      <br></br>
      <form >
        <FormGroup controlId="usuario" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="nombre" bsSize="large">
          <ControlLabel>Nombre</ControlLabel>
          <FormControl
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="apellido" bsSize="large">
          <ControlLabel>Apellido</ControlLabel>
          <FormControl
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            type="text"
          />
        </FormGroup>

        <FormGroup controlId="telefono" bsSize="large">
          <ControlLabel>Telefono</ControlLabel>
          <FormControl
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>


        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Tipo Usuario</ControlLabel> <br/>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret  color="primary">
              Tipo de Usuario
      </DropdownToggle>
            <DropdownMenu>
              <DropdownItem value="1" onClick={e => setTipo(e.target.value)}>Admin</DropdownItem>
              <DropdownItem value="2" onClick={e => setTipo(e.target.value)}>Restaurante</DropdownItem>
              <DropdownItem value="3" onClick={e => setTipo(e.target.value)}>Cliente</DropdownItem> 
            </DropdownMenu>
          </ButtonDropdown>

          
        </FormGroup>






        <Button block bsSize="large" onClick={handleSubmit}>
          Registrar Usuario
        </Button>


      </form>
    </div>
  );
}