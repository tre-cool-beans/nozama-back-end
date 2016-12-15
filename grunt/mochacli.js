'use strict';

const testDatabase = 'mongodb://localhost/nozama-api-test';

module.exports = {
  options: {
    env: {
      MONGODB_URI: testDatabase,
      NODE_PATH: process.env.PWD,
    },
  },
  all: ['<%= paths.src.spec %>'],
};
