var famine = require('../famine'),
    Either = famine.Either,
    MonadEither = famine.MonadEither;

var something = new Either.Right(10).bind(function(n){
  return new Either.Left('FAILURE: ' + n);
});

console.log(something); // Left "Failure: 10"