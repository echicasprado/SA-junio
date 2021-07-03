const {Router } =  require('express');
const router = Router();
const compra = require('../models/compra');
var nodemailer = require('nodemailer');

router.get('/', (req, res) => res.send('Hello World'));

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'sagrupo11@gmail.com',
      pass: 'SAGrupo11?'
  }
});


router.post('/compra', (req, res) =>{
    console.log(req.body);

    var producto = req.body;
    var productos = "";
    for(p of producto.productos){
      productos = productos + '<h6>'+ p.nombre +'   Q. ' + p.precio + '</h6>\n';
    }

    var mail_option = {
      from: 'BookSA <sagrupo11@gmail.com>',
      to: producto.usuario,
      subject: 'Factura de libros',
      html: '<h1>BookSA</h1> \n <h3>Libros comprados: </h3>\n' + productos + '\n<h3>Total: Q. '+ producto.total+ '</h3>'
    }
    
    // Guardando en la BD
    new compra(producto).save(err => {
        if (err) return console.log("Error no se pudo efectuar la compra", err);
              
        console.log("Compra realizada exitosamente");

        transport.sendMail(mail_option, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          return info.messageId;
        });

        res.json(true);  //Envío de respuesta
      });

   
    
});
module.exports = router;