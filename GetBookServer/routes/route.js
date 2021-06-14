'use strict';
module.exports = function(app) {
  var Books = require('../controllers/controller');

  app.route('/book/getBooks')
    .get(Books.getBooks);

  app.route('/')
    .get(function(req, res) {
      res.send("Hello World! - Get Books");
    });
};