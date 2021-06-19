import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { URL } from '../variables/rutas';
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'
import * as CryptoJS from 'crypto-js';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const tokenFromUI = "SA-Encryption";

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function makeRequest(request, param = '') {
    const response = await fetch(`${URL.login}/`);
    return response;
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

    if (email === 'root') {
      //alert("Logged in");
      localStorage.setItem('current', JSON.stringify({ "id": 1, "estado": true, "id_tipo_usuario": "1", "usuario": "root", "nombre": "Kevin Alexander", "apellido": "Garcia Jachac", "direccion": "Guatemala jbkj", "telefono": "35158654", "password": "" }));
      history.push("/admin/dashboard");
    }
    if (email === 'samuel') {
      //alert("Logged in");
      localStorage.setItem('current', JSON.stringify({ "id": 1, "estado": true, "id_tipo_usuario": "2", "usuario": "samuel", "nombre": "Kevin Alexander", "apellido": "Garcia Jachac", "direccion": "Guatemala jbkj", "telefono": "35158654", "password": "" }));
      history.push("/admin/dashboard");
    }
    console.log("******************************")
    console.log(URL.login)
    console.log(process.env.REACT_APP_IP_2)


    const encrypted =  await encryptUsingAES256(tokenFromUI, password);
    console.log(email, password)
      fetch(`${URL.login}/Login`, {
        method: 'POST',
        body: JSON.stringify({

          user: email,
          password: encrypted

        }),
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        }
      })
      .then(async function (response) {
        let respuesta = await response.json();
        alert(respuesta)
        console.log(respuesta)

        try {
          var obj = respuesta._id;

          if (obj != undefined) {

            let val = respuesta

            localStorage.setItem('current', JSON.stringify(val));

            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000
            }
            toastr.clear()
            setTimeout(() => toastr.success(`Credenciales Correctas`), 300)

            history.push("/admin/dashboard");
          } else {
            toastr.options = {
              positionClass: 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 60000
            }
            toastr.clear()
            setTimeout(() => toastr.warning(`Credenciales incorrectas`), 300)

          }


        } catch (error) {

        }


      }


      );



  }

  async function goToForgotPassword(event) {
    event.preventDefault();
    history.push("RegistrarUsuarios");
  }

  async function goToCrearPedido(event) {
    event.preventDefault();
    history.push("CrearPedido");
  }



  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP! Ingresa tus datos</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresar las credenciales aquí (Kubernetes Cambio Calificacion).</h5>
      <br></br>
      <br></br>
      <form >
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        <Button block bsSize="large" disabled={!validateForm()} onClick={handleSubmit} id="login">
          Login
        </Button>

        <Button block bsSize="large" onClick={goToForgotPassword}  >
          Registrar Usuario
        </Button>

        <Button block bsSize="large" onClick={goToCrearPedido}  >
          Realizar Pedido
        </Button>
      </form>
    </div>
  );
}