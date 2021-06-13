'use strict';
module.exports = function(app) {
  var deleteBook = require('../controllers/controller');

  app.route('/book/deleteBook')
    .post(deleteBook.deleteBookController);

};