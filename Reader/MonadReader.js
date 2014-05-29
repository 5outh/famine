var Reader = require('./Reader');

module.exports = {
  pure : function(m){
    return new Reader(function(r){
      return m;
    });
  },   
  // ask :: Reader r r
  ask : function(){
    return new Reader(function(x){ return x; });
  },
  // asks :: (r -> a) -> Reader r a
  asks : function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Reader.asks');
    }
    return this.ask().bind(function(r){
      return new Reader(f(r));
    });
  }
}