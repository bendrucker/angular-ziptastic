!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.angularZiptastic=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var angular  = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

module.exports = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null)
  .module('ziptastic', [])
  .provider('ziptastic', require('./ziptastic'))
  .name;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ziptastic":1}]},{},[2])(2)
});