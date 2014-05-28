var famine = require('../famine'),
    State  = famine.State,
    MState = famine.MonadState; // shortened for get and put calls...

// Statefully pops off the first element of a stack and returns the value along with the stack.
// Kind of a "pure" version of Array.shift().
var popState = 
  MState.get().bind(function(xs){
    var ys = xs.slice(1, xs.length);
    return MState.put(ys).bind(function(_){
      return MState.pure(xs[0]);
    });
  });

console.log(popState.runState([1, 2, 3])); // State [2, 3] 1