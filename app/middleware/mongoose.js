'use strict';

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/nozama-api';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;
