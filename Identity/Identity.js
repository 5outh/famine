// Identity
var Identity = function(val){
  
  if(!(this instanceof Identity)){
    return new Identity(val);
  }

  this.value = val;
};

Identity.prototype.concat = function(id){
  return new Identity(this.value.concat(id.value));
};

Identity.prototype.empty = function() {
  return new Identity(this.value.constructor.empty());
};

Identity.prototype.map = function(f) {
  return new Identity(f(this.value));
};

Identity.prototype.ap = function(id) {
  return new Identity(this.value(id.value));
};

Identity.prototype.chain = function(f) {
  return new f(this.value);
};

Identity.prototype.cochain = function(f){
  return new Identity(f(this));
}

Identity.of = function(a){
  return new Identity(a);
};

module.exports = Identity;

// var Identity = function(val){

//   // protect against no `new` keyword when building.
//   if(!(this instanceof Identity)){
//     return new Identity(val);
//   }

//   this.val = val;

//   // fmap :: (a -> b) -> Identity a -> Identity b
//   this.fmap = function(f){
//     if(typeof f !== 'function'){
//       throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.fmap');
//     }
//     return new Identity( f( val ) );
//   }
  
//   // apply :: Identity (a -> b) -> Identity a -> Identity b
//   this.apply = function(id){
//     if(typeof this.val !== 'function'){
//       throw new Error('Expected function, but got ' + typeof this.val + ' in the first argument of Identity.apply');
//     }else if(!(id instanceof Identity && id.type === 'Identity')){
//       throw new Error('Expected Identity, but got ' + typeof id + ' in the first argument of Identity.apply');
//     }
//     return new Identity( (this.val)( id.val ) );
//   }

//   // bind :: Identity a -> (a -> Identity b) -> Identity b
//   this.bind = function(f){
//     if(typeof f !== 'function'){
//       throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.bind');
//     }
//     var ret = f(val);
//     if(!(ret instanceof Identity && ret.type === 'Identity')){
//       throw new Error('Expected `f` to return an `Identity`, but returned something else.');
//     }
//     return ret;
//   }

//   // cobind :: Identity a -> (Identity a -> b) -> Identity b
//   this.cobind = function(f){
//     if(typeof f !== 'function'){
//       throw new Error('Expected function, but got ' + typeof f + ' in the first argument of Identity.cobind');
//     }
//     return new Identity ( f ( this ) );
//   }
  
//   this.functor     = true;
//   this.applicative = true;
//   this.monad       = true;
//   this.comonad     = true;
//   this.type        = 'Identity';
// }

// // statics
// Identity.pure = function(x){ return new Identity(x); }

Identity.coof = function(idx){ 
  if(!(idx instanceof Identity && idx.type === 'Identity')){
    throw new Error('Expected type Identity in first argument of MonadIdentity.copure, but got ' + typeof idx);
  }
  return idx.value;
}

Identity.prototype.toString = function() {
  return "Identity " + this.value.toString();
}

module.exports = Identity;