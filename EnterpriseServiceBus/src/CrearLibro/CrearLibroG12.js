const axios = require('axios').default;

var CrearLibroG12 = async (req, res) => {
    console.log('grupo 12')
   
    let newData = {
        titulo: req.body.title,
        autor: req.body.author,
        precio: req.body.price.toString(), 
        cantidad: req.body.units,
        idEditorial: 31,
        generos: [1,5,12],
       
    }
   
    console.log('data12 -> ', newData)

    axios.post(`http://35.222.176.39/api/addbooks/add_book`, newData)
    .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}


module.exports = { CrearLibroG12 }