var TC = require('../TypeChecker'),
    Errors = require('../Errors');

// Nothing
var Nothing = function(){
  // protect against no `new` keyword when building.
  if(!(this instanceof Nothing)){
    return new Nothing();
  }

  this.value = null;
  this.type = 'Maybe';
}

Nothing.prototype.map = function(f){ return Nothing; };
Nothing.prototype.ap = function(m){ return Nothing; };
Nothing.prototype.bind = function(f){ return Nothing; };
Nothing.prototype.toString = function(){ return "Nothing"; };

// Just
var Just = function(value){

  // protect against no `new` keyword when building.
  if(!(this instanceof Just)){
    return new Just(val);
  }

  this.value = value;
  this.type = 'Maybe';
}

Just.prototype.map = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Just.map');
  
  var res = f(this.value);

  if(res === Nothing){ return new Nothing; }
  else{ return new Just(res); }
}

Just.prototype.empty = function(){
  Errors.varError(!TC.isMonoid(this.value), this.value, 'Monoid', 'Just.empty');

  return new Just( this.value.empty ? this.value.empty() : this.value.constructor.empty() );
}

Just.prototype.concat = function(maybe){
  Errors.varError(!TC.isMonoid(this.value), this.value, 'Monoid', 'Just.concat');
  Errors.argError(!maybe.type === 'Maybe', maybe, 'Maybe', 'first', 'Just.concat');
  Errors.argError(!TC.isMonoid(maybe.value), maybe.value, 'Monoid', 'first', 'Just.concat');

  return new Just(this.value.concat(id.value));
};

Just.prototype.ap = function(m){
  Errors.varError(!TC.isFunction(this.value), this.value, 'function', 'Just.ap');
  Errors.argError(m.type !== 'Maybe', m, 'Maybe', 'first', 'Just.concat');
  if(m === Nothing) return Nothing;
  else return new Just( val (m.value) );
}

Just.prototype.chain = function(f) {
  Errors.varError(!TC.isFunction(f), f, 'function', 'Just.chain');
  var res = f(this.value);
  Errors.returnTypeError(res.type !== 'Maybe', res, 'Maybe', 'Just.chain');
  return res;
}

Just.type = 'Maybe';

Just.prototype.toString = function(){
  return "Just " + (this.value.toString());
}

// Maybe
var Maybe = {
  Just : Just,
  Nothing : Nothing,
  of : function(x){
    return new Just(x);
  },
  empty : function(){
    return Just.empty();
  },
  concat : function(m1, m2){
    return m1.concat(m2);
  },
  type : 'Maybe'
}

module.exports = Maybe;