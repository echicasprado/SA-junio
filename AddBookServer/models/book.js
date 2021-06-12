'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  coverPage: String,
  description: String,
  price: Number,
  units: Number,
  author: Number,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
});


module.exports = mongoose.model('Book', BookSchema);