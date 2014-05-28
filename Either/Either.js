// Either

// fmap and bind on Left values are just the identity
var Left = function(val){
  // fmap :: (a -> b) -> Either l a -> Either l b 
  var fmap = function(f){
    return Left(val);
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  var apply = function(e){
    return Left(val);
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  var bind = function(f){
    return Left(val);
  }

  return {
    val : val,
    fmap : fmap,
    bind : bind
  }
}

// Right is where all the fun stuff takes place.
var Right = function(val){
  // fmap :: (a -> b) -> Either l a -> Either l b 
  var fmap = function(f){
    return Right(f(val));
  }

  // apply :: Either l (a -> b) -> Either l a -> Either l b
  var apply = function(e){
    return Right( e.fmap(val) );
  }

  // bind :: Either l a -> (a -> Either l b) -> Either l b
  var bind = function(f){
    return f(val);
  }

  return {
    val : val,
    fmap : fmap,
    bind : bind
  }
}

// console.log(Right(3).bind(function(x){
//   return (x*10);
// }));

module.exports = {
  Right : Right,
  Left : Left
}