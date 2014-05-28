// constructor for monoids
var Monoid = function(mempty, mappend){
  return {
    mempty : mempty,
    mappend : mappend,
    monoid : true
  }
}

// the String monoid
var StringM = Monoid(
  "", 
  function(x, y){
    return x + y;
  }
);

// the List monoid
var ListM = Monoid(
  [], 
  function(x, y){
    return x.concat(y);
  }
);

var Sum = Monoid(
  0,
  function(x, y){
    return x + y;
  }
);

var Product = Monoid(
  1,
  function(x, y){
    return x * y;
  }
);

module.exports = {
  Monoid : Monoid,
  StringM : StringM,
  ListM : ListM,
  Sum : Sum,
  Product : Product
}