var famine = require('../famine'),
    Identity = famine.Identity;

var five = new Identity(5);

var result = five.chain(function(n){
  return Identity.of(n + 9);
});

console.log(result.toString()); // Identity 14