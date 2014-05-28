var famine    = require('../famine'),
    List      = famine.List,
    MonadList = famine.MonadList;

var xs = new List([1, 2, 3]);

var withSquares = xs.bind(function(n){
  return new List([n, n*n]);
});

console.log(withSquares); // List [1, 1, 2, 4, 3, 9]

var withSquaresApplicative = new List([famine.id, function(n){ return n*n; }]).apply(xs);

console.log(withSquaresApplicative); // List [1, 1, 2, 4, 3, 9]