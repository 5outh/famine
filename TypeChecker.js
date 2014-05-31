var isFunction = function(obj) {
  return (obj && typeof obj === 'function');
}

var isSemigroup = function(obj){
  return isFunction(obj.empty)
      || isFunction(obj.constructor.empty);
}

var isMonoid = function(obj){
  return isSemigroup(obj) 
      && isFunction(obj.concat);
}

var isFunctor = function(obj){
  return isFunction(obj.map);
}

var isApply = function(obj){
  return isFunctor(obj)
      && isFunction(obj.ap);
}

var isApplicative = function(obj){
  return isApply(obj) 
      && ( isFunction(obj.of)
        || isFunction(obj.constructor.of) );
}

var isChain = function(obj){
  return isFunctor(obj)
      && isFunction(obj.chain);
}

var isMonad = function(obj){
  return isChain(obj)
      && isApplicative(obj);
}

var isExtend = function(obj){
  return isFunction(obj.extend);
}

var isComonad = function(obj){
  return isExtend(obj)
      && ( isFunction(obj.from) 
        || isFunction(obj.constructor.from) );
}

module.exports = {
  isFunction : isFunction,
  isSemigroup : isSemigroup,
  isMonoid : isMonoid,
  isFunctor : isFunctor,
  isApply : isApply,
  isApplicative : isApplicative,
  isChain : isChain,
  isMonad : isMonad,
  isExtend : isExtend,
  isComonad : isComonad
}