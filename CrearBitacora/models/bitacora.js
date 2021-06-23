'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BitacoraSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  editorial: String,
  fecha: { type: Date, default: Date.now},
  operacion: String,
  descripcion: String
});

module.exports = mongoose.model('Bitacora', BitacoraSchema);