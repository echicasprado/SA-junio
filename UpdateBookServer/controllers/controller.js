'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.updateBookController = function(req, res){
    Book.findById(req.body._id, function(err, book){
        book.title = req.body.title;
        book.coverPage = req.body.coverPage;
        book.description = req.body.description;
        book.price = req.body.price;
        book.units = req.body.units;
        book.author = req.body.author;
        book.category = req.body.category;

        book.save(function(err){
            if(err) return res.send(500, err.message);
            res.json(book);
        });
    });
};