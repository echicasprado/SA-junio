const axios = require('axios').default;

var RegistroG10 = async (req, res) => {
    console.log('grupo 10');  
   
       
    // Rol de usuario
        switch(req.body.id_rol){
            case 1: this.rol = 'Administrador'
            break
            case 2:  this.rol = 'Editorial'
            break
            case 3:  this.rol = 'Cliente'
            break
            default: this.rol = 'Cliente'
            break
           }    
        
        // Estado de usuario
        switch(req.body.estado){
            case 0: this.estado = false
            break
            case 1:  this.estado = true
            break
            default: this.estado = true
            break
           }    
   
   
    let newData = {

        nombres: req.body.nombre,
        apellidos: req.body.apellido,
        email:  req.body.correo,
        password:  req.body.password,
        direccion: "Guatemala",
        celuar:  req.body.telefono.toString(),
        tipo: this.rol,
        aprobado: this.estado

    }


    console.log('data10 -> ', newData)

    axios.post(`http://3.15.230.185:3000/cliente/cliente`, newData)
        .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });


}

module.exports = { RegistroG10 }