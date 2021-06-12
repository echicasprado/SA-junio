const {Router } =  require('express');
const router = Router();
const compra = require('../models/compra');

router.get('/', (req, res) => res.send('Hello World'));

router.post('/compra', (req, res) =>{
    console.log(req.body);

    var producto = req.body;
    
    // Guardando en la BD
    new compra(producto).save(err => {
        if (err) return console.log("Error no se pudo efectuar la compra", err);
              
        console.log("Compra realizada exitosamente");
        res.send(true);  //Envío de respuesta
      });

   
    
});
module.exports = router;