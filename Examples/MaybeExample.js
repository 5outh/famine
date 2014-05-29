var famine = require('../famine'),
    Maybe  = famine.Maybe,
    MonadMaybe = famine.MonadMaybe;

var a = new Maybe.Just(3);

var addThreeMultTwo = (a.bind(function(x){
  return new Maybe.Just(x+3);
}).fmap(function(x){
  return x*2;
}));

console.log(addThreeMultTwo.toString()); // Just 12