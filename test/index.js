'use strict';

var angular = require('angular');
var expect  = require('chai').expect;

describe('angular-ziptastic', function () {

  var ziptastic, $httpBackend;
  beforeEach(angular.mock.module(require('../')));
  beforeEach(angular.mock.inject(function (_ziptastic_, _$httpBackend_) {
    ziptastic    = _ziptastic_;
    $httpBackend = _$httpBackend_;
  }));

  it('queries a US zip code by default', function () {
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
    ziptastic.lookup({
      code: '10009'
    })
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
  });

  it('can query a foreign zip code', function () {
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
  });

  it('requires a postal code', function () {
    expect(ziptastic.lookup).to.throw('"code" must be provided');
  });

});
