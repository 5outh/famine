var famine = require('../famine'),
    Tuple  = famine.Tuple;

var doubleSecond = new Tuple(1, 'x').bind(function(second){
  // Note we have to explicitly set `1` back here: The only info the function has is its second argument.
  return new Tuple(1, second + second);
});

console.log(doubleSecond.toString()); // (1, 'xx')