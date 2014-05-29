// Reader m r = Reader{ runReader :: m -> r }
var Reader = function(g){

  // protect against no `new` keyword when building.
  if(!(this instanceof Reader)){
    return new Reader(g);
  }

  if(typeof g !== 'function'){
    throw new Error('Expected function but got ' + typeof g + ' in constructor for Reader');
  }

  // runReader :: m -> r
  this.runReader = g;

  // (a -> b) -> Reader m a -> Reader m b
  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Reader.fmap');
    }
    return new Reader(function(r){ return f( g( r ) ); });
  }
  
  // Reader m (a -> b) -> Reader m a -> Reader m b
  this.apply = function(reader){
    if(!(reader instanceof Reader && reader.type === 'Reader')){
      throw new Error('Expected Reader but got ' + typeof reader + ' in the first argument of Reader.apply');
    }
    var next = reader.runReader();
    if(typeof next !== 'function'){
      throw new Error('Expected function but got ' + typeof next + ' in value next in Reader.apply');
    }
    return new Reader(function(m){
      return g(m)(next(m));
    });
  }

  // Reader m a -> (a -> Reader m b) -> Reader m b
  this.bind = function(k){
    if(typeof k !== 'function'){
      throw new Error('Expected function but got ' + typeof k + ' in the first argument of Reader.bind');
    }
    return new Reader(function(r){
      var next = k(g(r));
      if(!(next instanceof Reader && next.type === 'Reader')){
        throw new Error('Expected Reader but got ' + typeof next + ' in return type for Reader.bind');
      }
      return this.runReader( next.runReader( r ) );
    });
  }


  // local :: (s -> r) -> Reader r a -> Reader s a
  this.local = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Reader.local');
    }
    return new Reader(function(r){ return f( (this.runReader)( r ) ); } );
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Reader';
}

//NB. toString doesn't really have a nice definition for Reader.

module.exports = Reader;