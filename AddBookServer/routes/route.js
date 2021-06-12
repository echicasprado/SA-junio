'use strict';
module.exports = function(app) {
  var addBook = require('../controllers/controller');

  // todoList Routes
  app.route('/book/addBook')
    .post(addBook.createNewBook);
};