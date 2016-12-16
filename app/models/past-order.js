'use strict';

const mongoose = require('mongoose');

const pastOrderSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  purchased_on: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

// pastOrderSchema.virtual('length').get(function length() {
//   return this.text.length;
// });

const PastOrder = mongoose.model('PastOrder', pastOrderSchema);

module.exports = PastOrder;
