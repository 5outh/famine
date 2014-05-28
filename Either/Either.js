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
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Left.fmap');
    }
    return Left(this.val);
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  this.apply = function(e){
    if(e.type !== 'Either'){
      throw new Error('Expected Either but got ' + typeof e + ' in the first argument of Left.apply');
    }
    return Left(this.val);
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Left.bind');
    }    
    return Left(this.val);
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
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Right.fmap');
    }
    return Right(f(val));
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  this.apply = function(e){
    if(e.type !== 'Either'){
      throw new Error('Expected Either but got ' + typeof e + ' in the first argument of Right.apply');
    }else if(typeof (this.val) !== 'function'){
      throw new Error('Expected function value but got ' + typeof (this.val) + ' in the function Right.apply.')
    }
    return Right( e.fmap(val) );
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Right.bind');
    }
    var ret = f(val);
    if(ret.type !== 'Either'){
      throw new Error('Expected Either but got ' + typeof ret + ' in the return value of Right.bind');
    }
    return ret;
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