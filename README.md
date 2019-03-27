typescript-after-extends
------------------------
[![Build Status](https://travis-ci.org/pine613/typescript-after-extends.svg?branch=master)](https://travis-ci.org/pine613/typescript-after-extends)
[![devDependency Status](https://david-dm.org/pine613/typescript-after-extends/dev-status.svg)](https://david-dm.org/pine613/typescript-after-extends#info=devDependencies)
[![npm version](https://badge.fury.io/js/typescript-after-extends.svg)](http://badge.fury.io/js/typescript-after-extends) [![Greenkeeper badge](https://badges.greenkeeper.io/pine/typescript-after-extends.svg)](https://greenkeeper.io/)

## Usage

```
$ npm install typescript-after-extends
```

## Examples
### Basic example

```ts
var afterExtends: any = require('typescript-after-extends');

class Base {
    foo = 1;
    _baz = 0;

    bar() {
        return 'bar';
    }

    get baz() {
        return this._baz;
    }

    set baz(_baz: number) {
        this._baz = _baz;
    }
}

class SubImpl {
    sub() {
        return 'sub';
    }
}

var Sub: typeof Base = afterExtends(SubImpl, Base);

var sub = new Sub();

sub instanceof Base;    // true
sub instanceof Sub;     // true
sub instanceof SubImpl; // false

sub.sub();    // 'sub'

sub.bar();    // 'bar'
sub.baz;      // 0
sub.baz = 10;
sub.baz;      // 10
```

## Developing
### Developing environment

- JavaScript & TypeScript
- gulp
- tsd

### Build

```
$ npm install
$ npm run build
```

### Test
Run tests for this library using Mocha and Chai.

```
$ npm run typings
$ npm run build-tests
$ npm test
```