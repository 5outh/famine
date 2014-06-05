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
  this.type = 'State';
}

State.prototype.map = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument for State.map');
  }
  var oldRun = this.runState;
  return new State(function(s){
    var next = oldRun(s);
    if(!(next instanceof Tuple && next.type === 'Tuple')) {
      throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable next in State.map');
    }
    return new Tuple(f(next.fst), next.snd);
  });
}

State.prototype.ap = function(state){
  if(!(state instanceof State && state.type === 'State')){
    throw new Error('Expected State but got ' + typeof state + ' in the first argument of State.ap');
  }
  
  var oldRun = this.runState;

  return new State(function(s){
    var next = state.runState(s),
        cur  = oldRun(s);

    if(typeof next !== 'function'){
      throw new Error('Expected function but got ' + typeof next + ' in the variable next in State.ap');
    }

    if(!(cur instanceof Tuple && cur.type === 'Tuple')) {
      throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable cur in State.ap');
    }

    return new Tuple((cur.fst)(next.fst), next.snd);
  });
}

State.prototype.chain = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of State.chain');
  }

  var oldRun = this.runState;

  return new State(function(s){
    var next = oldRun(s),      // tuple (a, s)
        nextState = f(next.fst); // new state from tuple value
    if(!(nextState instanceof State && nextState.type === 'State')) {
      throw new Error('Expected State but got ' + typeof nextState + ' in the variable next in State.chain');
    }

    if(!(next instanceof Tuple && next.type === 'Tuple')) {
      throw new Error('Expected Tuple but got ' + typeof next + ' in type of variable cur in State.chain');
    }

    return nextState.runState(next.snd); 
  });
}

State.get = function(){
  return new State(function(s){
    return new Tuple(s, s);
  });
};

State.put = function(s){
  return new State(function(r){
    return new Tuple(null, s);
  });
}

State.of = function(a){
  return new State(function(s){
    return new Tuple(a, s);
  });
}

// NB. toString doesn't have a nice instance for State.

module.exports = State;