'use strict';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  image_url : {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

// productSchema.virtual('length').get(function length() {
//   return this.text.length;
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
