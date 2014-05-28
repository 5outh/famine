var famine = require('../famine'),
    Either = famine.Either,
    MonadEither = famine.MonadEither;

var something = new Either.Right(10).bind(function(n){
  return new MonadEither.pure('FAILURE: ' + n);
});

console.log(something.toString()); // Left "Failure: 10"