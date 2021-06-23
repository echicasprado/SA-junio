'use strict'

var mongoose = require('mongoose'),
    Bitacora = mongoose.model('Bitacora');

exports.createNewBitacora = function(req, res){
    var newBitacora = new Bitacora(req.body);
    newBitacora.save(function(err,bitacora){
        if(err)
            res.send(err);
        res.json(bitacora);
    });
};