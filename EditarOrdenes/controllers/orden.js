var mongoose = require('mongoose');
var Orden  = mongoose.model('compra');

//Devuelve todos las solicitudes
exports.editarOrden = function(req, res) {
	Orden.findOne({_id: req.body._id}, function(err, user) {
		
		user.estado		=   req.body.estado

		user.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).json(user);
		});
	});
};
