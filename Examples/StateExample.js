var famine = require('../famine'),
    State  = famine.State;

// Statefully pops off the first element of a stack and returns the value along with the stack.
var popState = 
  State.get().chain(function(xs){
    var ys = xs.slice(1, xs.length);
    return State.put(ys).chain(function(_){
      return State.of(xs[0]);
    });
  });

console.log(popState.runState([1, 2, 3]).toString()); // (1, [2, 3])