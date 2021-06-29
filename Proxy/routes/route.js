'use strict';
module.exports = function(app) {
  var Services = require('../controllers/controller');

  app.route('/')
    .get(function(req, res) {
      res.send("ESB - GRUPO 11");
    });

  app.route('/book/getBooks')
    .get(Services.getBook);

  app.route('/bitacora/newBitacora')
    .post(Services.postBitacora);

};