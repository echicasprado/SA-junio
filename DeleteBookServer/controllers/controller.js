'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.deleteBookController = function(req, res){

    Book.findById(req.body._id, function(err, book){
        book.remove(function(err){
            if(err) return res.send(500, err.message);
            res.json({status:200});
        });
    });
};
