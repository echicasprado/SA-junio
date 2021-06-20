'use strict';
module.exports = function(app) {
  var addBook = require('../controllers/controller');

  app.route('/book/addBook')
    .post(addBook.createNewBook);

  app.route('/')
    .get(function(req, res) {
      res.send("Add - Books");
    })
};