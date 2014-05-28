var famine = require('../famine'),
    Identity = famine.Identity,
    MonadIdentity = famine.MonadIdentity;

var five = new Identity(5);

var result = five.bind(function(n){
  return MonadIdentity.pure(n + 9);
});

console.log(result.toString()); // Identity 14