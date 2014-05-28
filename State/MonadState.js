var State = require('./State'),
    Tuple = require('../Tuple/Tuple');

module.exports = {
  pure : function(a){
    return State(function(s){
      return Tuple(a, s);
    });
  }
}