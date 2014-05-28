// Either

// fmap and bind on Left values are just the identity
var Left = function(val){

  // protect against being called without `new` keyword
  if(!(this instanceof Left)){
    return new Left(val);
  }
  
  this.val = val;
  
  // fmap :: (a -> b) -> Either l a -> Either l b 
  this.fmap = function(f){
    return Left(val);
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  this.apply = function(e){
    return Left(val);
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  this.bind = function(f){
    return Left(val);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Either';
}

// Right is where all the fun stuff takes place.
var Right = function(val){
  
  // protect against being called without `new` keyword
  if(!(this instanceof Right)){
    return new Right(val);
  }
  this.val = val;

  // fmap :: (a -> b) -> Either l a -> Either l b 
  this.fmap = function(f){
    return Right(f(val));
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  this.apply = function(e){
    return Right( e.fmap(val) );
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  this.bind = function(f){
    return f(val);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Either';
}

module.exports = {
  Right : Right,
  Left : Left
}