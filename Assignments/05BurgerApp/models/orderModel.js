var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  name: String,
  ingredients: Array, //It would have been great if you used referenced docs instead
  price: Number
});

module.exports = mongoose.model('orderSchema', orderSchema);