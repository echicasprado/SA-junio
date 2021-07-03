const axios = require('axios').default;

var loginG11= async (req, res) => {
    console.log('grupo 11')
   
    axios.get(`http://34.69.133.221:47005/book/getBooks`)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}

module.exports = {loginG11 }