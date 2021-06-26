var mongoose = require('mongoose');
var Solicitud  = mongoose.model('Solicitud');

//Devuelve todos las solicitudes
exports.findAllSolicitudes = function(req, res) {
	Solicitud.find(function(err, user) {
    if(err) res.send(500, err.message);

		res.status(200).json(user);
	});
};
