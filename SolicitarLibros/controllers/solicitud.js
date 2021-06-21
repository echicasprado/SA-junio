var mongoose = require('mongoose');
var Solicitud  = mongoose.model('Solicitud');

//Insertar una nueva solicitud
exports.registrarSolicitud = function(req, res) {

	var solicitud = new Solicitud({
		nombre:                 req.body.nombre,
		autor:                  req.body.autor,
		primera_publicacion:    req.body.primera_publicacion,
		pdf:    				req.body.pdf
	});

	solicitud.save(function(err, solicitud) {
		if(err) return res.status(500).send( err.message);
	res.status(200).json(solicitud);
	});
};
