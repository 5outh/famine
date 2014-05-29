var famine = require('../famine'),
    State  = famine.State;

// Statefully pops off the first element of a stack and returns the value along with the stack.
// Kind of a "pure" version of Array.shift().
var popState = 
  State.get().bind(function(xs){
    var ys = xs.slice(1, xs.length);
    return State.put(ys).bind(function(_){
      return State.pure(xs[0]);
    });
  });

console.log(popState.runState([1, 2, 3])); // State [2, 3] 1