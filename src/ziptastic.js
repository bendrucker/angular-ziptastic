'use strict';

var angular  = require('angular');
var defaults = {
  base: 'https://zip.getziptastic.com/v2',
  country: 'US'
};

module.exports = function () {
  this.setBase = function (base) {
    defaults.base = base;
  };
  this.setCountry = function (country) {
    defaults.country = country;
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
