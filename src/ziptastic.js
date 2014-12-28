'use strict';

var angular  = require('angular');
var defaults = {
  base: 'https://zip.getziptastic.com/v2',
  country: 'US'
};

module.exports = function () {
  this.base = function (base) {
    defaults.base = base;
  };
  this.country = function (country) {
    defaults.country = country;
  };
  this.$http = function (config) {
    defaults.$http = config;
  };

  this.$get = ziptastic;
};

function ziptastic ($http) {
  return {
    lookup: function (options) {
      if (typeof options === 'string') {
        options = {
          code: options
        };
      }
      options = angular.extend({}, defaults, options);
      if (!options.code) throw new Error('A "code" must be provided for lookup');
      return $http.get(options.base + '/' + options.country + '/' + options.code, options.$http)
        .then(function (response) {
          return response.data;
        });
    }
  };
}
ziptastic.$inject = ['$http'];
