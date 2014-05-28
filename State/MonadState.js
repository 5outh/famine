var State = require('./State'),
    Tuple = require('../Tuple/Tuple');

var get = function(){
  return new State(function(s){
    return new Tuple(s, s);
  });
};

var put = function(s){
  return new State(function(r){
    return new Tuple(null, s);
  });
}

module.exports = {
  pure : function(a){
    return new State(function(s){
      return new Tuple(a, s);
    });
  },
  get : get,
  put : put
}