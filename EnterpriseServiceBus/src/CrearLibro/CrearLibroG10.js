const axios = require('axios').default;
nombreimg: String;
let contador = 5;

var CrearLibroG10 = async (req, res) => {

    console.log('grupo 10');
    contador = contador + 1;
    nombreimg= "Img"+contador;
    
   
    let newData = {
        titulo: req.body.title,
        editorial: req.body.editorial,
        stock: req.body.units,
        genero: req.body.category[0],
        descripcion: req.body.description,
        imageName: nombreimg,
        extension: "jpg",
        base64: req.body.coverPage,
        Precio: req.body.price.toString()   
    }
   
    

    console.log('data10 -> ', newData)

    axios.post(`http://3.15.230.185:3000/libros/libros`, newData)
        .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });


}

module.exports = { CrearLibroG10 }