'use strict';
module.exports = function(app) {
  var updateBook = require('../controllers/controller');

  app.route('/book/addBook')
    .post(updateBook.updateBookController);

};