'use strict';
module.exports = function(app) {
  var Books = require('../controllers/controller');

  app.route('/book/getBooks')
    .get(Books.getBooks);

  app.route('/book/getBooksEdit')
    .post(Books.getBooksEdit);

  app.route('/')
    .get(function(req, res) {
      res.send("Get - Books");
    });
};