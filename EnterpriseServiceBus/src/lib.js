const axios = require('axios').default;
const loginG12 = require('./Login/loginG12').loginG12 
const loginG11 = require('./Login/loginG11').loginG11 
const loginG10 = require('./Login/loginG10').loginG10 

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
    case 12: loginG12(req, res)
    break
    case 10: loginG10(req, res)
    break
    default: loginG11(req, res)
    break
   }    
}


var switchBus = (req, res) => {
    grupo = req.body.grupo
}



module.exports = { switchBus, defaultLogin, defaultCatalogo, defaultCrearProducto }

