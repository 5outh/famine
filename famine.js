var Monoid = require('./Monoid/Monoid');
var Either = require('./Either/Either'),
    Identity = require('./Identity/Identity'),
    List = require('./List/List'),
    Maybe = require('./Maybe/Maybe'),
    State = require('./State/State'),
    Writer = require('./Writer/Writer'),
    Tuple = require('./Tuple/Tuple'),
    TC = require('./TypeChecker');

var empty = function(a){
  if(TC.isSemigroup(a)){
    return a.value.empty ? a.value.empty() : a.value.constructor.empty();
  };
};

var concat = function(a, b){
  if(TC.isMonoid(a) && TC.isMonoid(b)){
    return a.concat(b);
  };
};

var map = function(a, f){
  if(TC.isFunctor(a) && TC.isFunction(f)){
    return a.map(f);
  };
};

var ap = function(a, b){
  if(TC.isApplicative(a) && TC.isApplicative(b)){
    return a.ap(b);
  };
};

var chain = function(a, f){
  if(TC.isChain(a) && TC.isFunction(f)){
    return a.chain(f);
  };
};

var extend = function(a, f){
  if(TC.isExtend(a) && TC.isFunction(f)){
    return a.extend(f);
  };
};

var compose = function(f, g){
  return function(x){
    return f(g(x));
  };
};

var identity = function(n){ return n; };

var constant = function(y){ 
  return function(){ return y; }; 
};

module.exports = {
  Either : Either,
  Identity : Identity,
  List : List,
  Maybe : Maybe,
  State : State,
  Writer : Writer,
  Tuple : Tuple,
  Monoid : Monoid,
  empty : empty,
  concat : concat,
  map : map,
  ap : ap,
  chain : chain,
  extend : extend,
  compose : compose,
  identity : identity,
  constant : constant
}