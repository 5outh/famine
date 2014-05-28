var famine    = require('../famine'),
    List      = famine.List,
    MonadList = famine.MonadList;

var xs = new List([1, 2, 3]);

var withSquares = xs.bind(function(n){
  return new List([n, n*n]);
});

console.log(withSquares.toString()); // List [1, 1, 2, 4, 3, 9]

var withSquaresApplicative = new List([famine.id, function(n){ return n*n; }]).apply(xs);

console.log(withSquaresApplicative.toString()); // List [1, 2, 3, 1, 4, 9]