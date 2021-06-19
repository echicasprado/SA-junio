'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.getBooks = function(req, res){
    Book.find(function(err,books){
        if(err) res.send(500, err.message);
        console.log(books);
        res.json(books);
    });
};

exports.getBooksEdit = function(req, res){
    console.log(req.body.editorial);

    Book.find({editorial: req.body.editorial}, function(err, books){
        if(err) res.send(500, err.message);
        console.log(books);
        res.json(books);
    });
}
