'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  coverPage: String,
  description: String,
  price: Number,
  units: Number,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
});


module.exports = mongoose.model('Books', BookSchema);