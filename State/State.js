// State Monad

// State s a = State{ runState :: s -> (a, s) }
// NB. `oldRun` is needed because `this` gets overwritten on `new` calls.
var State = function(f){

  // protect against no `new` keyword when building.
  if(!(this instanceof State)){
    return new State(f);
  }


  // runState :: s -> (a, s)
  this.runState = function(s){
    return f(s);
  }

  // fmap :: (a -> b) -> State s a -> State s b
  this.fmap = function(f){
    var oldRun = this.runState;
    return new State(function(s){
      var next = oldRun(s);
      return new Tuple(f(next.fst), next.snd);
    });
  }

  // apply :: State s (a -> b) -> State s a -> State s b
  this.apply = function(state){
    var oldRun = this.runState;
    return new State(function(s){
      var next = state.runState(s),
          cur  = oldRun(s);
      return new Tuple((cur.fst)(next.fst), next.snd);
    });
  }

  // bind :: State s a -> (a -> State s b) -> State s b
  this.bind = function(f){
    var oldRun = this.runState;
    return new State(function(s){
      var next = oldRun(s),      // tuple (a, s)
          nextState = f(next.fst); // new state from tuple value
      // @TODO: Figure out why this needs type checks
      if(typeof nextState == 'function'){
        return nextState(next.snd);
      }else{
        return nextState.runState(next.snd); 
      }
    });
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'State';
}

module.exports = State;