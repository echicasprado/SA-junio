'use strict';

const { get } = require('../../Compras/src/routes');

module.exports = function(app) {
  var updateBook = require('../controllers/controller');

  app.route('/book/updateBook')
    .post(updateBook.updateBookController);

  app.route('/')
    .get(function(req, res) {
      res.send("Hello World!");
    })




};