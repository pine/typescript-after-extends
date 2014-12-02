typescript-after-extends
------------------------
[![Build Status](https://travis-ci.org/pine613/typescript-after-extends.svg?branch=master)](https://travis-ci.org/pine613/typescript-after-extends)

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
}

var Sub: typeof Base = afterExtends(SubImpl, Base);

var sub = new Sub();

sub instanceof Base;    // true
sub instanceof Sub;     // true
sub instanceof SubImpl; // false

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
$ npm run typings
$ npm run build
```

### Test

```
$ npm run build-tests
$ npm test
```