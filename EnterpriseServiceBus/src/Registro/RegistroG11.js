const axios = require('axios').default;

var RegistroG11= async (req, res) => {
    console.log('grupo 11')
   
    axios.post(`http://34.69.133.221:47001/Registro`, req.body)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}

module.exports = {RegistroG11 }