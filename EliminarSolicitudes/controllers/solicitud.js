var mongoose = require('mongoose');
var Solicitud  = mongoose.model('Solicitud');

//Elimina una solicitud
exports.eliminarSolicitud = function(req, res) {
	Solicitud.find({_id: req.body._id}, function(err, u){
		if(err) return res.send(500, err.message)
		else{
			if(u.length == 0){
				return res.status(500).json('La solicitud no existe');
			}
			else{
				Solicitud.findOneAndDelete({_id: req.body._id}, function(erro) {
					if(erro) return res.send(500, erro.message);
					else{
						res.status(200).json("Solicitud eliminada con exito");
					}
				})
			}
		}
	});
}
