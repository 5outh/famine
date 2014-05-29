var famine = require('../famine'),
    Either = famine.Either;

var something = new Either.Right(10).bind(function(n){
  return new Either.Left('FAILURE: ' + n);
});

console.log(something.toString()); // Left "Failure: 10"