var mongoose = require('mongoose');
var Orden  = mongoose.model('compra');

//Devuelve todos las solicitudes
exports.findOrdenes = function(req, res) {
	Orden.find({usuario: req.body.usuario}, function(err, user) {
    if(err) res.send(500, err.message);

		res.status(200).json(user);
	});
};
