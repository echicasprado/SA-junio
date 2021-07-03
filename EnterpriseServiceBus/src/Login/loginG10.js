const axios = require('axios').default;

var loginG10 = async (req, res) => {
    console.log('grupo 10')
   
    let newData = {email: req.body.user, password: req.body.password}
    console.log('data10 -> ', newData)

    axios.post(`http://3.15.230.185:3000/login/login`, newData)
    .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(convertData(response.data)));
    }).catch(function (error) {
        res.send(error.message);
    });

}


var convertData = (data) => {
    return {
        _id: data._id,
        nombre: data.nombres,
        apellido: data.apellidos,
        correo: data.email,
        password: data.password,
        telefono: data.celular,
        id_rol: data.tipo === "Cliente"? 3 : data.tipo === "Editorial"? 2 : 1,
        estado: 1 
    }
}

module.exports = { loginG10 }