// Tuples

var Tuple = function(a, b){

  // protect against no `new` keyword when building.
  if(!(this instanceof Tuple)){
    return new Tuple(a, b);
  }

  this.fst = a;
  this.snd = b;

  // fmap :: (a -> b) -> (c, a) -> (c, b)
  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Tuple.fmap');
    }
    return new Tuple(a, f(b));
  };

  // apply :: (c, (a -> b)) -> (c, a) -> (c, b)
  this.apply = function(tuple){
    if(!(tuple instanceof Tuple && tuple.type === 'Tuple')) {
      throw new Error('Expected Tuple but got ' + typeof tuple + ' in the first argument of Tuple.apply');
    }else if(!(this.snd instanceof Tuple && this.snd.type === 'Tuple')){
      throw new Error('Expected Tuple but got ' + typeof (this.snd) + ' in the snd value of this in Tuple.apply'); 
    }
    return new Tuple(tuple.fst, (this.snd)(tuple.snd));
  };

  // bind :: (c, a) -> (a -> (c, b)) -> (c, b)
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Tuple.bind');
    }
    
    var res = f(b);
    
    if(!(res instanceof Tuple && res.type === 'Tuple')){
      throw new Error('Expected Tuple but got ' + typeof res + ' in the return type of Tuple.apply'); 
    }
    
    return res;
  };

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Tuple';
}

Tuple.pure = function(monoid, b){
  if(monoid.type !== 'Monoid'){
    throw new Error('Expected Monoid but got ' + typeof monoid + ' in the first argument of Tuple.pure'); 
  }
  return new Tuple(monoid.mempty, b);
}

Tuple.prototype.toString = function(){
  return "(" + this.fst + "," + this.snd + ")";
}

module.exports = Tuple;