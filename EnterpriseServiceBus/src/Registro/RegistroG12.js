const axios = require('axios').default;

var RegistroG12 = async (req, res) => {
    console.log('grupo 12')
   
           
    // Rol de usuario
    switch(req.body.id_rol){
        case 1: this.rol = 'admin'
        break
        case 2:  this.rol = 'editorial'
        break
        case 3:  this.rol = 'cliente'
        break
        default: this.rol = 'cliente'
        break
       }    
    
    let newData = {
        name :  req.body.nombre,
        lastname :  req.body.apellido,
        email :  req.body.correo,
        password : req.body.password, 
        status : req.body.estado.toString(),
        phone : req.body.telefono.toString(),
        type : this.rol
    }
   
    console.log('data12 -> ', newData)

    axios.post(`http://35.222.176.39/api/authentication/register`, newData)
    .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}


module.exports = { RegistroG12 }