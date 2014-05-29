var Tuple = require('../Tuple/Tuple');

// State Monad

// State s a = State{ runState :: s -> (a, s) }
// NB. `oldRun` is needed because `this` gets overwritten on `new` calls.
var State = function(f){

  // protect against no `new` keyword when building.
  if(!(this instanceof State)){
    return new State(f);
  }

  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in constructor for State');
  }

  // runState :: s -> (a, s)
  this.runState = f;

  // fmap :: (a -> b) -> State s a -> State s b
  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument for State.fmap');
    }
    var oldRun = this.runState;
    return new State(function(s){
      var next = oldRun(s);
      if(!(next instanceof Tuple && next.type === 'Tuple')) {
        throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable next in State.fmap');
      }
      return new Tuple(f(next.fst), next.snd);
    });
  }

  // apply :: State s (a -> b) -> State s a -> State s b
  this.apply = function(state){
    if(!(state instanceof State && state.type === 'State')){
      throw new Error('Expected State but got ' + typeof state + ' in the first argument of State.apply');
    }
    
    var oldRun = this.runState;

    return new State(function(s){
      var next = state.runState(s),
          cur  = oldRun(s);

      if(typeof next !== 'function'){
        throw new Error('Expected function but got ' + typeof next + ' in the variable next in State.apply');
      }

      if(!(cur instanceof Tuple && cur.type === 'Tuple')) {
        throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable cur in State.apply');
      }

      return new Tuple((cur.fst)(next.fst), next.snd);
    });
  }

  // bind :: State s a -> (a -> State s b) -> State s b
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of State.bind');
    }

    var oldRun = this.runState;

    return new State(function(s){
      var next = oldRun(s),      // tuple (a, s)
          nextState = f(next.fst); // new state from tuple value
      if(!(nextState instanceof State && nextState.type === 'State')) {
        throw new Error('Expected State but got ' + typeof nextState + ' in the variable next in State.bind');
      }

      if(!(next instanceof Tuple && next.type === 'Tuple')) {
        throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable cur in State.bind');
      }

      return nextState.runState(next.snd); 
    });
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'State';
}

// NB. toString doesn't have a nice instance for State.

module.exports = State;