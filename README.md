angular-ziptastic [![Build Status](https://travis-ci.org/bendrucker/angular-ziptastic.svg?branch=master)](https://travis-ci.org/bendrucker/angular-ziptastic)
=================

[Ziptastic](http://www.getziptastic.com/) ZIP -> City/State lookups for Angular

## Installation
```bash
# use npm
$ npm install angular-ziptastic
# or bower
$ bower install angular-ziptastic
```

## Setup

Include `'ziptastic'` in your module's dependencies:

```js
// node module exports the string 'ziptastic' for convenience
angular.module('myApp', [
  require('angular-ziptastic')
]);
// otherwise, include the code first then the module name
angular.module('myApp', [
  'ziptastic'
]);
```

## API

### `ziptasticProvider`

##### `base(baseUrl)` -> `undefined`

Sets the default base URL for requests. Defaults to `'https://zip.getziptastic.com/v2'`.

##### `country(country)` -> `undefined`

Set the default country to use in requests. Defaults to `'US'`.

##### `$http(config)` -> `undefined`

Set default `config` for `$http`. Defaults to `undefined`. `config` is an object that will be passed directly to [`$http`](https://docs.angularjs.org/api/ng/service/$http#usage) and can be used to set config options like `timeout` and `cache`

<hr>

### `ziptastic`

##### `lookup(code|options)` -> `promise`

Performs a Ziptastic lookup, either with a `code` string or an `options` object that specifies:

* `code` (string): The postal code
* `country` (string): Overrides the default country
* `base` (string): Overrides the default base
* `$http` (object): Overrides the default `$http` configuration

Returns a `$q` promise for the Ziptastic response.

```js
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
  })
  .catch(function (err) {
    console.err('Error in lookup', err);
  });
```