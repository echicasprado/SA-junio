import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {
  active = 1;
  tipouser: number = JSON.parse(localStorage.getItem('usuario')).id_rol; 
  
  myForm = new FormGroup({
    
    precio: new FormControl("" , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),
    pais: new FormControl("" , [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)
    ]),

    total: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15)
    ]),
  
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const datos = this.myForm.value;
      var resultado;
      var iva;

      switch (datos.pais) {
        case "Alemania":
            iva = 0.19;
            break;
        case "Argentina":
            iva = 0.21;
            break;
        case "Bolivia":
            iva = 0.13;
            break;
        case "Canadá":
            iva = 0.05;
            break;
        case "China":
            iva = 0.17;
            break;
        case "Corea del Sur":
            iva = 0.10;
            break;
        case "Croacia":
            iva = 0.25;
            break;
        case "Dinamarca":
            iva = 0.25;
            break;
        case "El Salvador":
            iva = 0.13;
            break;
        case "Estados Unidos":
            iva = 0.13;
            break;
        case "España":
            iva = 0.21;
            break;
        case "Francia":
            iva = 0.20;
            break;
        case "Guatemala":
            iva = 0.12;
            break;
        case "Hungría":
            iva = 0.27;
            break;
        case "India":
            iva = 0.15;
            break;
        case "Japón":
            iva = 0.08;
            break;
        case "Marruecos":
            iva = 0.20;
            break;
        case "México":
            iva = 0.16;
            break;
        case "Noruega":
            iva = 0.25;
            break;
        case "Rusia":
            iva = 0.18;
            break;
        case "Suecia":
            iva = 0.25;
            break;
       
      }


      resultado = "Q." + (parseInt(datos.precio,10) * iva).toFixed(2);
      console.log("Iva:" + iva);
      console.log("resultado:" + resultado);
      return resultado;    
  }


}
