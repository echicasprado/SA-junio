const axios = require('axios').default;

var catalogoG12 = async (req, res) => {
    console.log('grupo 12')

    axios.get(`http://35.222.176.39/api/catalogos/catalogos/catalogo`) 
        .then(function (response) {
        console.log(response)
        res.send(convertData(response.data.data))
    }).catch(function (error) {
        res.send(error.message);
    });


    
        


/**
 * {"id":9,
 * "titulo":"El diario de Sofia",
 * "autor":"Jostein Gaarder",
 * "id_editorial":31,
 * "precio":200,
 * "cantidad":0,
 * "estado":1,
 * "fecha_creado":"2021-06-11T06:38:07.000Z",
 * "url":"https://201503595.s3.us-east-2.amazonaws.com/booksa/libro1.jpg",
 * "categorias":"Relatos,Fisolofia","editorial":"Paola"}
 */

}


var convertData = (data) => {
    console.log(data)
   return data.map((x)=>{
  
        return {
            _id:            x.id,
            title:          x.titulo,
            units:          x.cantidad,
            coverPage:      x.url,//convertir a b64
            description:    x.descripcion,
            price:          x.precio,
            author:         x.autor
        }
    })
    /*
    GRUPO 11
     "_id": "60cd804dc112482e8498a973",
        "title": "Hombre de maiz 1",
        "coverPage": "imagen en base 64",
        "description": "Libro escrito para el presidente de Guatemala",
        "price": 200,
        "units": 100,
        "author": 
    */

}



module.exports = { catalogoG12 }