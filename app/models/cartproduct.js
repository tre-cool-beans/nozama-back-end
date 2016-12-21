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
    min: [1, 'Product has to be at least $1'],
  },
  size: {
    type: String,
    enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  image_url : {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Must have at least 1 of product'],
    max: [10, 'Cannot have more than 10 of product'],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

cartProductSchema.virtual('line_price').get(function length() {
  return this.price * this.quantity;
});

const CartProduct = mongoose.model('CartProduct', cartProductSchema);

module.exports = CartProduct;
