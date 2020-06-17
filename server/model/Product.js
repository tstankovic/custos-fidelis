const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
