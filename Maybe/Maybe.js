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
  this.val = val;
  // fmap :: (a -> b) -> Maybe a -> Maybe b
  this.fmap = function(f) {
    var res = f(val);
    if(res == null || res == undefined || res == Nothing){
      return new Nothing;
    }
    else{
      return new Just(res);
    }
  }

  // apply :: Maybe (a -> b) -> Maybe a -> Maybe b
  this.apply = function(m){
    if(m == Nothing) return Nothing;
    else{
      return new Just( val (m.val) );
    }
  }

  // bind :: Maybe a -> (a -> Maybe b) -> Maybe b
  this.bind = function(f) {
    return f(val);
  }
}

module.exports = {
  Just : Just,
  Nothing : Nothing
}