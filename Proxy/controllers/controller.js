'use strict'
const axios = require('axios');
const host = "34.69.133.221";

exports.getBook = function(req, res) {
    axios.get(`http://${host}:47005/book/getBooks`)
        .then(function (response){
            res.send(JSON.stringify(response.data));
        }).catch(function(err){
            res.send(err.message);
        });
};

exports.postBitacora = function(req,res){
    axios.post(`http://${host}:47010/bitacora/newBitacora`,{
            editorial: req.body.editorial,
            operacion: req.body.operacion,
            description: req.body.description
        }).then(function (response){
            res.send(JSON.stringify(response.data));
        }).catch(function(err){
            res.send(err.message);
        });
}