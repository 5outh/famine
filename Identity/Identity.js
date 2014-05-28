// Identity
var Identity = function(val){

  // protect against no `new` keyword when building.
  if(!(this instanceof Identity)){
    return new Identity(val);
  }

  this.val = val;

  // fmap :: (a -> b) -> Identity a -> Identity b
  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.fmap');
    }
    return new Identity( f( val ) );
  }
  
  // apply :: Identity (a -> b) -> Identity a -> Identity b
  this.apply = function(id){
    if(typeof this.val !== 'function'){
      throw new Error('Expected function, but got ' + typeof this.val + ' in the first argument of Identity.apply');
    }else if(!(id instanceof Identity && id.type === 'Identity')){
      throw new Error('Expected Identity, but got ' + typeof id + ' in the first argument of Identity.apply');
    }
    return new Identity( (this.val)( id.val ) );
  }


  // bind :: Identity a -> (a -> Identity b) -> Identity b
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.bind');
    }
    return f(val);
  }

  // cobind :: Identity a -> (Identity a -> b) -> Identity b
  this.cobind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.cobind');
    }
    return new Identity ( f ( this ) );
  }
  
  this.functor     = true;
  this.applicative = true;
  this.monad       = true;
  this.comonad     = true;
  this.type        = 'Identity';
}

Identity.prototype.toString = function idToString(){
  return "Identity " + (this.val).toString();
}

module.exports = Identity;