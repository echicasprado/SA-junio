'use strict';
module.exports = function(app) {
  var addBitacora = require('../controllers/controller');

  app.route('/bitacora/newBitacora')
    .post(addBitacora.createNewBitacora);

  app.route('/')
    .get(function(req, res) {
      res.send("Add - Bitacora");
    })
};