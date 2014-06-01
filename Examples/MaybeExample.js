var famine = require('../famine'),
    Maybe  = famine.Maybe;
    
var a = new Maybe.Just(3);

var addThreeMultTwo = (a.chain(function(x){
  return new Maybe.of(x+3);
}).map(function(x){
  return x*2;
}));

console.log(addThreeMultTwo.toString()); // Just 12