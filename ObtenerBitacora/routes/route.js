'use strict';
module.exports = function(app) {
  var addBitacora = require('../controllers/controller');

  app.route('/bitacora/getBitacora')
    .get(addBitacora.getBitacora);

  app.route('/')
    .get(function(req, res) {
      res.send("Get - Bitacora");
    })
};