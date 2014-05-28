// Maybe

var Nothing = {
  val  : {},
  fmap : function(f){
    return Nothing;
  },
  apply : function(m){
    return Nothing;
  },
  bind : bind = function(f){
    return Nothing;
  }
};

var Just = function(val){
  var fmap = function(f) {
    var res = f(val);
    if(res == null || res == undefined || res == Nothing){
      return Nothing;
    }
    else{
      return Just(res);
    }
  }

  // apply :: Maybe (a -> b) -> Maybe a -> Maybe b
  var apply = function(m){
    if(m == Nothing) return Nothing;
    else{
      return Just( val (m.val) );
    }
  }

  var bind = function(f) {
    return f(val);
  }

  return {
    val : val,
    fmap : fmap,
    apply : apply,
    bind : bind
  };
}

var Maybe = {
  Nothing : Nothing,
  Just    : Just,
  pure    : function(val) {
    return Just(val);
  }
}

// var a = Just(3);
// console.log(a.bind(function(x){
//   return Just(x+3);
// }).fmap(function(x){
//   return x*2;
// }));

// console.log(Maybe);

module.exports = {
  Maybe : Maybe,
  Just : Just,
  Nothing : Nothing
}