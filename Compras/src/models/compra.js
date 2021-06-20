const {Schema, model} = require('mongoose');

const compraSchema = new Schema({
    producto: [{type: Object}],
    usuario: {type: Object}
});

module.exports = model('compra',compraSchema);