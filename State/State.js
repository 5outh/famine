// State Monad

// State s a = State{ runState :: s -> (a, s) }
var State = function(f){
  var runState = function(s){
    return f(s);
  }

  var fmap = function(f){
    return State(function(s){
      var next = runState(s);
      return Tuple(f(next.fst), next.snd);
    });
  }

  // apply :: State s (a -> b) -> State s a -> State s b
  var apply = function(state){
    return State(function(s){
      var next = state.runState(s),
          cur  = runState(s);
      return Tuple((cur.fst)(next.fst), next.snd);
    });
  }

  // bind :: State s a -> (a -> State s b) -> State s b
  var bind = function(f){
    return function(s){
      var next = runState(s),      // tuple
          nextState = f(next.fst); // new state from tuple value
      // @TODO: Figure out why this needs type checks
      if(typeof nextState == 'function'){
        return nextState(next.snd);
      }else{
        return nextState.runState(next.snd); 
      }
    }
  }

  return {
    runState : runState,
    fmap : fmap,
    bind : bind
  }
}

var StateMonad = {
  State : State,
  pure : function(a){
    return State(function(s){
      return Tuple(a, s);
    });
  }
}

var get = function(){
  return State(function(s){
    return Tuple(s, s);
  });
};

var put = function(s){
  return State(function(r){
    return Tuple(null, s);
  });
}

var popState = 
  get().bind(function(xs){
    var ys = xs.slice(1, xs.length);
    return put(ys).bind(function(_){
      return StateMonad.pure(xs[0]);
    });
  });

// console.log(popState([1, 2, 3]));

module.exports = {
  State : State,
  StateMonad : StateMonad,
  get : get,
  put : put
}