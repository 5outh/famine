// Reader m r = Reader{ runReader :: m -> r }
var Reader = function(g){
  // runReader :: m -> r
  this.runReader = g;

  // (a -> b) -> Reader m a -> Reader m b
  this.fmap = function(f){
    return new Reader(function(r){ return f( g( r ) ); });
  }
  
  // Reader m (a -> b) -> Reader m a -> Reader m b
  this.apply = function(reader){
    // g :: m -> (a -> b)
    var next = reader.runReader();

    return new Reader(function(m){
      return g(m)(next(m));
    });
  }

  // Reader m a -> (a -> Reader m b) -> Reader m b
  this.bind = function(k){
    return new Reader(function(r){
      return this.runReader( ( k( g( r ) ) )( r ) );
    });
  }

  // ask :: Reader r r
  this.ask = function(){
    return new Reader(g);
  }

  // asks :: (r -> a) -> Reader r a
  this.asks = function(f){
    return this.ask().bind(function(r){
      return new Reader(f(r));
    });
  }
}

module.exports = Reader;