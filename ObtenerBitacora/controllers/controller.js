'use strict'

var mongoose = require('mongoose'),
    Bitacora = mongoose.model('Bitacora');

exports.getBitacora = function(req, res){
    Bitacora.find(function(err,bitacora){
        if(err) res.send(500,err.message);
        res.json(bitacora);
    });
};