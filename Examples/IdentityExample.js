var famine = require('../famine'),
    Identity = famine.Identity;

var five = new Identity(5);

var result = five.chain(function(n){
  return Identity.of(n + 9);
});

console.log(result.toString()); // Identity 14

// or in famine notation

var _result = famine.chain(five, function(n){
  return Identity.of(n + 9);
});

console.log(_result.toString()); // Identity 14