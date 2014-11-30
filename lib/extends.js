/**
 * Mixin
 */
function mixin (self, other, withoutProto) {
    for (var key in other) {
        if (other.hasOwnProperty(key)) {
            if (key !== 'prototype' || !withoutProto) {
                var d = Object.getOwnPropertyDescriptor(other, key);
                Object.defineProperty(self, key, d);
            }
        }
    }
}

/**
 * Create named class with extends
 */
function createNamedClass (name, klass, baseKlass, superFunc) {
    if (!superFunc) {
        superFunc = function () {
            baseKlass.call(this);
        };
    }
    
    return new Function(
        'klass', 'superFunc',
        'return function ' + name + ' () {' +
            'superFunc.apply(this, arguments);' +
            'klass.apply(this, arguments);' +
        '};'
        )(klass, superFunc);
}

/**
 * TypeScript extends later
 */
function afterExtends (klass, baseKlass, superFunc) {
    var newKlass = createNamedClass(klass.name, klass, baseKlass, superFunc);
    
    mixin(newKlass, baseKlass, true);
    mixin(newKlass, klass, true);
    
    mixin(newKlass.prototype, baseKlass.prototype);
    mixin(newKlass.prototype, klass.prototype);
    
    return newKlass;
}

module.exports = afterExtends;