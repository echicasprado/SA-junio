const axios = require('axios').default;

var loginG11= async (req, res) => {
    console.log('grupo 11')
   
    axios.post(`http://34.69.133.221:47001/Login`, req.body)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}

module.exports = {loginG11 }