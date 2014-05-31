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
  if(!this.value.monoid){
    throw new Error('Expected value to be a Monoid in Identity.empty');
  }else if(!id.value.monoid){
    throw new Error('Expected id.value to be a Monoid in the first argument of Identity.empty');
  }
  return new Identity( this.value.empty ? this.value.empty() : this.value.constructor.empty() );
};

// Monoid (Monoid a => Identity a -> Identity a -> Identity a)
Identity.prototype.concat = function(id){
  if(!this.value.monoid){
    throw new Error('Expected value to be a Monoid in Identity.concat');
  }else if(!id.value.monoid){
    throw new Error('Expected id.value to be a Monoid in the first argument of Identity.concat');
  }
  return new Identity(this.value.concat(id.value));
};

// Functor
Identity.prototype.map = function(f) {
  if(typeof f !== 'function'){
      throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.map');
    }
  return new Identity(f(this.value));
};

// Applicative
Identity.prototype.ap = function(id) {
  if(typeof this.value !== 'function'){
      throw new Error('Expected function, but got ' + typeof this.value + ' in the first argument of Identity.ap');
    }else if(!(id instanceof Identity && id.type === 'Identity')){
      throw new Error('Expected Identity, but got ' + typeof id + ' in the first argument of Identity.ap');
    }
  return new Identity(this.value(id.value));
};

// Monad
Identity.prototype.chain = function(f) {
  if(typeof f !== 'function'){
    throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.chain');
  }
  var ret = f(this.value);
  if(!(ret instanceof Identity && ret.type === 'Identity')){
    throw new Error('Expected `f` to return an `Identity`, but returned something else in Identity.chain.');
  }
  return f(this.value);
};

// Comonad
Identity.prototype.extend = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.extend');
  }
  return new Identity(f(this));
}

// Chain
Identity.of = function(a){
  return new Identity(a);
};

// Extendable? 
Identity.extract = function(idx){ 
  if(!(idx instanceof Identity && idx.type === 'Identity')){
    throw new Error('Expected type Identity in first argument of MonadIdentity.extract, but got ' + typeof idx);
  }
  return idx.value;
}

Identity.prototype.toString = function() {
  return "Identity " + this.value.toString();
}

// @TODO: These can probably be more global checks
Identity.semigroup   = true;
Identity.monoid      = true;
Identity.functor     = true;
Identity.applicative = true;
Identity.monad       = true;
Identity.comonad     = true;

module.exports = Identity;