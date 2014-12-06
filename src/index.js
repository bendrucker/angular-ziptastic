'use strict';

module.exports = require('angular')
  .module('ziptastic', [])
  .factory('ziptastic', require('./ziptastic'))
  .name;
