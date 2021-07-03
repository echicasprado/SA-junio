const axios = require('axios').default;
const jwt = require('jsonwebtoken')

var loginG12 = async (req, res) => {
    console.log('grupo 12')
   
    let newData = {email: req.body.user, password: req.body.password}
    console.log('data12 -> ', newData)

    axios.post(`http://35.222.176.39/api/authentication/login`, newData)
    .then(function (response) {

        var decoded = JSON.stringify(jwt.decode(response.data.data.token));
        var datos = JSON.parse(decoded)

        console.log(response.data.token)
        res.send(JSON.stringify(convertData(datos)));

    }).catch(function (error) {
        res.send(error.message);
    });

}

var convertData = (data) => {
    return {
        _id: data.id,
        nombre: data.name,
        apellido: data.lastname,
        correo: data.email,
        password: data.password,
        telefono: data.iat,
        id_rol: data.type === "editorial"? 2 : data.type === "cliente"? 3 : 1, 
        estado: 1 
    }
}

module.exports = { loginG12 }