var Tuple = require('./Tuple');

var TupleMonad = function(monoid){
  return { 
    Tuple : Tuple,
    pure : function(b){
      return Tuple(monoid.mempty, b);
    }
  }
}

module.exports = {
  pure : function(b){
    return Tuple(monoid.mempty, b);
  }
}