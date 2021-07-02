const axios = require('axios').default;

let ulrs = { 9:`0.0.0.0`, 10:`0.0.0.0`, 11:`34.69.133.221`, 12:`0.0.0.0`} 

var defaultLogin = async (req, res) => {
    console.log(req.body)
   
    axios.post(`http://${ulrs[11]}:47001/Login`, req.body)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}

var switchBus = (req, res) => {
    
}



module.exports = { switchBus, defaultLogin }

