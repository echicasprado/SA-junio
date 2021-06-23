'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BitacoraSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  editorial: String,
  fecha: { type: Date, default: Date.now},
  operacion: String,
  description: String
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);