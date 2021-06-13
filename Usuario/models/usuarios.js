var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

exports = module.exports = function(app, mongoose){
    
    var usuarioSchema = new Schema({
        nombre:     { type: String },
        apellido:   { type: String },
        correo:     { type: String },
        password:   { type: String },
        telefono:   { type: Number },
        id_rol:     { type: Number },
        estado:     { type: Number}
      });
      
      module.exports = mongoose.model('Usuario', usuarioSchema);
    
};