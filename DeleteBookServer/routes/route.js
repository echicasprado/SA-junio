'use strict';
module.exports = function(app) {
  var deleteBook = require('../controllers/controller');

  app.route('/book/deleteBook')
    .post(deleteBook.deleteBookController);

  app.route('/')
    .get(function(req, res) {
        res.send("Delete - Books");
    })
};