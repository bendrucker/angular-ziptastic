'use strict';

var angular = require('angular');
var base    = 'https://zip.getziptastic.com/v2';

module.exports = function ($http) {
  return {
    lookup: function (options) {
      options = angular.extend({}, {
        country: 'US'
      }, options);
      if (!options.code) throw new Error('A "code" must be provided for lookup');
      return $http.get(base + '/' + options.country + '/' + options.code)
        .then(function (response) {
          return response.data;
        });
    }
  }
};
module.exports.$inject = ['$http'];
