'use strict'

var mongoose = require('mongoose'),
    Book = mongoose.model('Book');

exports.getBooks = function(req, res){
    console.log('si llego')
    Book.find(function(err,books){
        if(err) res.send(500, err.message);
        console.log(books);
        res.json(books);
    });
};