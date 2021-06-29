var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

exports = module.exports = function(app, mongoose){
    
    var ordenCliente = new Schema({
        productos:          { type: Object },
        usuario:            { type: String },
        total:              { type: String },
        estado:             { type: Object }
      });
      
      module.exports = mongoose.model('compra', ordenCliente);
    
};
