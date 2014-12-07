/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

declare var window: any;
declare var TypeScriptAfterExtends: any;

if (typeof require === 'undefined') {
    window.require = function (m: string): any {
        if (m === 'chai') {
            return window.chai;
        }

        return TypeScriptAfterExtends;
    };
}

import chai = require('chai');
var expect = chai.expect;

var afterExtends: (self: any, base: any) => any = require('..');

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

class Sub {
}

describe('Basic Tests', () => {
    var NewSub: typeof Base;

    var base: Base;
    var sub: Base;

    before(() => {
        NewSub = afterExtends(Sub, Base);
    });

    beforeEach(() => {
        base = new Base();
        sub = new NewSub();
    });

    it('Instance variables (typeof)', () => {
        expect(sub.foo).to.be.a('number');
    });

    it('Instance variables (equal)', () => {
        expect(sub.foo).to.equal(base.foo);
    });

    it('Instance methods (typeof)', () => {
        expect(sub.bar).to.be.a('function');
    });

    it('Instance methods (equal)', () => {
        expect(sub.bar).to.equal(base.bar);
    });

    it('Instance getter (typeof)', () => {
        expect(sub.baz).to.be.a('number');
    });

    it('Instance getter (equal)', () => {
        expect(sub.baz).to.equal(base.baz);
    });

    it('Instance setter (equal)', () => {
        var baz = sub.baz = Math.random();
        expect(sub.baz).to.equal(baz);
    });
    
    it('instanceof Base', () => {
        expect(sub).to.be.an.instanceof(Base);
    });

    it('instanceof NewSub', () => {
        expect(sub).to.be.an.instanceof(NewSub);
    });
});
