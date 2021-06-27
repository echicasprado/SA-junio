const {Schema, model} = require('mongoose');

const compraSchema = new Schema({
    productos: [{type: Object}],
    usuario: {type: Object},
    total: {type: Object},
    estado: {type: Object}
});

module.exports = model('compra',compraSchema);