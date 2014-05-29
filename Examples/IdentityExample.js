var famine = require('../famine'),
    Identity = famine.Identity;

var five = new Identity(5);

var result = five.bind(function(n){
  return Identity.pure(n + 9);
});

console.log(result.toString()); // Identity 14