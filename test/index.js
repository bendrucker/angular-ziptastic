'use strict';

var angular = require('angular');
var expect  = require('chai').expect;

describe('angular-ziptastic', function () {

  var ziptastic, $httpBackend;
  beforeEach(angular.mock.module(require('../')));

  it('queries a US zip code by default', angular.mock.inject(function (ziptastic, $httpBackend) {
    $httpBackend
      .expectGET('https://zip.getziptastic.com/v2/US/10009')
      .respond(200, {
        city: 'New York City',
        country: 'US',
        county: 'New York',
        state: 'New York',
        state_short: 'NY',
        postal_code: '10009'
      });
    ziptastic.lookup('10009')
      .then(function (data) {
        expect(data).to.deep.equal({
          city: 'New York City',
          country: 'US',
          county: 'New York',
          state: 'New York',
          state_short: 'NY',
          postal_code: '10009'
        });
      });
    $httpBackend.flush();
  }));

  it('can query a foreign zip code', angular.mock.inject(function (ziptastic, $httpBackend) {
    $httpBackend
      .expectGET('https://zip.getziptastic.com/v2/NL/1071')
      .respond(200, {
        city: 'Amsterdam Oud Zuid en Rivierenbuurt',
        country: 'NL',
        county: '',
        state: 'Provincie Noord-Holland',
        state_short: '07',
        postal_code: '1071'
      });
    ziptastic.lookup({
      code: '1071',
      country: 'NL'
    })
    .then(function (data) {
      expect(data).to.deep.equal({
        city: 'Amsterdam Oud Zuid en Rivierenbuurt',
        country: 'NL',
        county: '',
        state: 'Provincie Noord-Holland',
        state_short: '07',
        postal_code: '1071'
      });
    });
    $httpBackend.flush();
  }));

  it('requires a postal code', angular.mock.inject(function (ziptastic) {
    expect(ziptastic.lookup).to.throw('"code" must be provided');
  }));

  it('can provide options for $http', angular.mock.inject(function (ziptastic, $httpBackend) {
    $httpBackend
      .expectGET('https://zip.getziptastic.com/v2/US/10009')
      .respond(200);
    var called = false;
    ziptastic.lookup({
      code: '10009',
      $http: {
        transformRequest: function () {
          called = true;
        }
      }
    })
    .then(function () {
      expect(called).to.be.true;
    });
    $httpBackend.flush();
  }));

  it('can change the default country', function () {
    angular.mock.module(function (ziptasticProvider) {
      ziptasticProvider.setCountry('NL');
    });
    angular.mock.inject(function (ziptastic, $httpBackend) {
      $httpBackend
        .expectGET('https://zip.getziptastic.com/v2/NL/1071')
        .respond(200);
      ziptastic.lookup('1071');
      $httpBackend.flush();
    });
  });

  it('can change the default base', function () {
    angular.mock.module(function (ziptasticProvider) {
      ziptasticProvider.setBase('http://myziptastic.com');
      ziptasticProvider.setCountry('US');
    });
    angular.mock.inject(function (ziptastic, $httpBackend) {
      $httpBackend
        .expectGET('http://myziptastic.com/US/10009')
        .respond(200);
      ziptastic.lookup('10009');
      $httpBackend.flush();
    });
  });

});
