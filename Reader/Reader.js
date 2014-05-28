// Reader m r = Reader{ runReader :: m -> r }
var Reader = function(g){
  // runReader :: m -> r
  var runReader = function(){
    return g;
  }

  // (a -> b) -> Reader m a -> Reader m b
  var fmap = function(f){
    return Reader(function(r){ return f( g( r ) ); });
  }
  
  // Reader m (a -> b) -> Reader m a -> Reader m b
  var apply = function(reader){
    // g :: m -> (a -> b)
    var next = reader.runReader();

    return Reader(function(m){
      return g(m)(next(m));
    });
  }

  // Reader m a -> (a -> Reader m b) -> Reader m b
  var bind = function(k){
    return Reader(function(r){
      return runReader( ( k( g( r ) ) )( r ) );
    });
  }

  // ask :: Reader r r
  var ask = function(){
    return Reader(g);
  }

  // asks :: (r -> a) -> Reader r a
  var asks = function(f){
    return ask().bind(function(r){
      return Reader(f(r));
    });
  }

  return {
    runReader : runReader,
    fmap : fmap,
    bind : bind,
    ask : ask,
    asks : asks
  }
}

// @TODO: Reader Monad Example

module.exports = Reader;