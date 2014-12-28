'use strict';

module.exports = require('angular')
  .module('ziptastic', [])
  .provider('ziptastic', require('./ziptastic'))
  .name;
