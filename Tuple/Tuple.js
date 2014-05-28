// Tuples

var Tuple = function(a, b){

  this.fst = a;
  this.snd = b;

  // fmap :: (a -> b) -> (c, a) -> (c, b)
  this.fmap = function(f){
    return new Tuple(a, f(b));
  };

  // apply :: (c, (a -> b)) -> (c, a) -> (c, b)
  this.apply = function(tuple){
    return new Tuple(tuple.fst, b(tuple.snd));
  };

  // bind :: (c, a) -> (a -> (c, b)) -> (c, b)
  this.bind = function(f){
    return f(b);
  };

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Tuple';
}

module.exports = Tuple;