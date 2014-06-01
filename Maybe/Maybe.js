var TC = require('../TypeChecker');

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
  if(!TC.isFunction(f)){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of Just.map');
  }
  
  var res = f(this.value);

  if(res === Nothing){ return new Nothing; }
  else{ return new Just(res); }
}

Just.prototype.empty = function(){
  if(!TC.isMonoid(this.value)){
    throw new Error('Expected value to be a Monoid in Just.empty');
  }

  return new Just( this.value.empty ? this.value.empty() : this.value.constructor.empty() );
}

Just.prototype.concat = function(maybe){
  if(!TC.isMonoid(this.value)){
    throw new Error('Expected value to be a Monoid in Just.concat');
  }else if(!maybe.type === 'Maybe'){
    throw new Error('Expected maybe to be either Just or Nothing in the first argument of Just.concat'); 
  }else if(!TC.isMonoid(maybe.value)){
    throw new Error('Expected maybe.value to be a Monoid in the first argument of Just.concat');
  }
  return new Just(this.value.concat(id.value));
};

Just.prototype.ap = function(m){
  if(typeof (this.value) !== 'function'){
    throw new Error('Expected function but got ' + typeof (this.value) + ' in function Just.ap');
  }else if(m.type !== 'Maybe'){
    throw new Error('Expected Maybe but got ' + typeof m + ' in the first argument of Just.ap')
  }
  if(m === Nothing) return Nothing;
  else{
    return new Just( val (m.value) );
  }
}

Just.prototype.chain = function(f) {
  if(!TC.isFunction(f)){
    throw new Error('Expected function but got ' + typeof f + ' in function Just.chain');
  }
  var res = f(this.value);
  if(res.type !== 'Maybe'){
    throw new Error('Expected Maybe but got ' + typeof res + ' in the return type of Just.chain');
  }
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