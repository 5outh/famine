var TC = require('../TypeChecker'),
    Errors = require('../Errors');

// Identity
var Identity = function(val){
  
  if(!(this instanceof Identity)){
    return new Identity(val);
  }

  this.value = val;
  this.type = 'Identity';
};

// Semigroup (Semigroup a => Identity a)
Identity.prototype.empty = function() {
  Errors.varError(!TC.isMonoid(this.value), 'value', 'Monoid', 'Identity.empty');
  // empty can be in constructor or base class
  return new Identity( this.value.empty ? this.value.empty() : this.value.constructor.empty() );
};

// Monoid (Monoid a => Identity a -> Identity a -> Identity a)
Identity.prototype.concat = function(id){
  Errors.varError(!TC.isMonoid(this.value), 'value', 'Monoid', 'Identity.concat');
  Errors.varError(!TC.isMonoid(id.value), 'id.value' , 'Monoid', 'Identity.concat'); // Imperfect but it works
  return new Identity(this.value.concat(id.value));
};

// Functor
Identity.prototype.map = function(f) {
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Identity.map');
  return new Identity(f(this.value));
};

// Applicative
Identity.prototype.ap = function(id) {
  Errors.varError(!TC.isFunction(this.value), 'this.value', 'function', 'Identity.ap');
  Errors.argError(!(id instanceof Identity && id.type === 'Identity'), id, 'Identity', 'first', 'Identity.ap');
  return new Identity(this.value(id.value));
};

// Chain
Identity.prototype.chain = function(f) {
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Identity.chain');

  var ret = f(this.value);
  Errors.returnTypeError(!(ret instanceof Identity && ret.type === 'Identity'), ret, 'Identity', 'Identity.chain');
  return f(this.value);
};

// Extend
Identity.prototype.extend = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Identity.extend');
  return new Identity(f(this));
}

// Monad
Identity.of = function(a){
  return new Identity(a);
};

// Comonad
Identity.from = function(idx){ 
  Errors.argError(!(idx instanceof Identity && idx.type === 'Identity'), idx, 'Identity', 'first', 'Identity.extend');
  return idx.value;
}

Identity.prototype.toString = function() {
  return "Identity " + this.value.toString();
}

module.exports = Identity;