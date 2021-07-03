const axios = require('axios').default;
const loginG12 = require('./Login/loginG12').loginG12 
const loginG11 = require('./Login/loginG11').loginG11 
const loginG10 = require('./Login/loginG10').loginG10 
const CrearLibroG12 = require('./CrearLibro/CrearLibroG12').CrearLibroG12 
const CrearLibroG11 = require('./CrearLibro/CrearLibroG11').CrearLibroG11 
const CrearLibroG10 = require('./CrearLibro/CrearLibroG10').CrearLibroG10 
const RegistroG12 = require('./Registro/RegistroG12').RegistroG12 
const RegistroG11 = require('./Registro/RegistroG11').RegistroG11 
const RegistroG10 = require('./Registro/RegistroG10').RegistroG10 

var grupo = 11

var defaultLogin = async (req, res) => {
   switch(grupo){
    case 12: loginG12(req, res)
    break
    case 10: loginG10(req, res)
    break
    default: loginG11(req, res)
    break
   }    
}

var defaultRegistro = async (req, res) => {
   switch(grupo){
    case 12: RegistroG12(req, res)
    break
    case 10: RegistroG10(req, res)
    break
    default: RegistroG11(req, res)
    break
   }    
}

var defaultCatalogo = async (req, res) => {
   switch(grupo){
    case 12: loginG12(req, res)
    break
    case 10: loginG10(req, res)
    break
    default: loginG11(req, res)
    break
   }    
}

var defaultCrearProducto = async (req, res) => {
   switch(grupo){
    case 12: CrearLibroG12(req, res)
    break
    case 10: CrearLibroG10(req, res)
    break
    default: CrearLibroG11(req, res)
    break
   }    
}


var switchBus = (req, res) => {
    grupo = req.body.grupo
}



module.exports = { switchBus, defaultLogin, defaultRegistro, defaultCatalogo, defaultCrearProducto }

