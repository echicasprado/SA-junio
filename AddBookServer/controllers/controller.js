'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.createNewBook = function(req, res){
    var newBook = new Book(req.body);
    console.log(newBook);
    newBook.save(function(err,book){
        if(err)
            res.send(err);
        res.json(book);
    });
};