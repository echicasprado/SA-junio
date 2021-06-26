var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

exports = module.exports = function(app, mongoose){
    
    var libroSolicitud = new Schema({
        nombre:                 { type: String },
        autor:                  { type: String },
        primera_publicacion:    { type: String },
        pdf:                    { type: String }
      });
      
      module.exports = mongoose.model('Solicitud', libroSolicitud);
    
};
