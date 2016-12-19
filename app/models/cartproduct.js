'use strict';

const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
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
  size: {
    type: String,
    required: true,
  },
  image_url : {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

const CartProduct = mongoose.model('CartProduct', cartProductSchema);

module.exports = CartProduct;
