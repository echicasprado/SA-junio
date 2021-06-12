'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.updateBookController = function(req, res){
    var updateBook = new Book(req.body);
    console.log(updateBook);
    updateBook.save(function(err,book){
        if(err)
            res.send(err);
        res.json(book);
    });
};