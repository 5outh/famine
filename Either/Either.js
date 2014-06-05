// Either
var Errors = require('../Errors'),
    TC = require('../TypeChecker');

// fmap and bind on Left values are just the identity
var Left = function(val){

  // protect against being called without `new` keyword
  if(!(this instanceof Left)){
    return new Left(val);
  }
  
  this.val = val;
  this.type = 'Either';
}

Left.prototype.map = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Left.map');
  return Left(this.val);
}

Left.prototype.ap = function(e){
  Errors.argError(e.type !== 'Either', f, 'function', 'first', 'Left.ap');
  return Left(this.val);
}

Left.prototype.chain = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Left.chain');
  return Left(this.val);
}

Left.prototype.toString = function() {
  return "Left " + (this.val).toString();
}

// Right is where all the fun stuff takes place.
var Right = function(val){
  
  // protect against being called without `new` keyword
  if(!(this instanceof Right)){
    return new Right(val);
  }
  
  this.val = val;

  this.type = 'Either';
}

Right.prototype.map = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Right.map');
  return Right(f(val));
}

Right.prototype.ap = function(e){
  Errors.argError(e.type !== 'Either', f, 'function', 'first', 'Right.ap');
  Errors.varError(!TC.isFunction(this.val), 'Right.val', 'function', 'Right.ap');
  return Right( e.fmap(val) );
}

Right.prototype.chain = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'Right.chain');
  var ret = f(this.val);
  Errors.returnTypeError(ret.type !== 'Either', ret, 'Either', 'Either.chain');
  return ret;
}

Right.prototype.toString = function() {
  return "Right " + (this.val).toString();
}

module.exports = {
  Right : Right,
  Left : Left,
  of : function(x){
    return Right(x);
  }
}