const axios = require('axios').default;

var catalogoG10 = async (req, res) => {
    console.log('grupo 10')

    axios.get(`http://3.15.230.185:3000/libros/libros`)
    .then(function (response) {
        console.log(response)
        res.send(convertData(response.data))
    }).catch(function (error) {
        res.send(error.message);
    });


/*"_id":"60ce2eb1bf1d23001a5db515",
    "titulo":"Quiero Comunicación y Lenguaje A",
    "editorial":"Editorial Santillana",
    "stock":0,
    "genero":"educativo",
    "link":"https://grupo10sa.s3.us-east-2.amazonaws.com/libros/Quieroa-g10.jpg",
    "descripcion":"Proyecto orientado a la creación de experiencias de aprendizaje fantásticas en la exploración con el medio social y natural a través de actividades motivadoras tomando en cuenta la educación emocional, valores, desarrollo de hábitos y la evaluación como aprendizaje",
    "precio":"250"
    }*/

   // console.log('data10 -> ', newData)



}


var convertData = (data) => {
    return data.map((x)=>{
        
     return {
            _id:            x._id,
            title:          x.titulo,
            units:          x.stock,
            coverPage:      x.link,//convertir a b64
            description:    x.descripcion,
            price:          x.precio,
            author:         ""
        }
    })
    /**/


}



module.exports = { catalogoG10 }