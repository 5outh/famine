// Tuples

var Tuple = function(a, b){
  // (a -> b) -> (c, a) -> (c, b)
  var fmap = function(f){
    return Tuple(a, f(b));
  }

  // (c, (a -> b)) -> (c, a) -> (c, b)
  var apply = function(tuple){
    return Tuple(tuple.fst, b(tuple.snd));
  }

  // bind :: (c, a) -> (a -> (c, b)) -> (c, b)
  var bind = function(f){
    return f(b);
  }

  return {
    fst : a, 
    snd : b,
    fmap : fmap,
    bind : bind
  };
}

// console.log( TupleMonad(StringM).pure(1) );

module.exports = Tuple;