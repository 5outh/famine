var Tuple = require('./Tuple');

var TupleMonad = function(monoid){
  return { 
    pure : function(b){
      return new Tuple(monoid.mempty, b);
    }
  }
}

module.exports = TupleMonad