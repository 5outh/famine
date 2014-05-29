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
  }, 
  functor : true, 
  applicative : true,
  monad : true,
  type : 'Maybe',
  toString : function(){ return "Nothing"; }
};

var Just = function(val){

  // protect against no `new` keyword when building.
  if(!(this instanceof Just)){
    return new Just(val);
  }
  
  this.val = val;

  // fmap :: (a -> b) -> Maybe a -> Maybe b
  this.fmap = function(f) {
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Just.fmap');
    }
    
    var res = f(this.val);

    if(res == Nothing){
      return new Nothing;
    }
    else{
      return new Just(res);
    }
  }

  // apply :: Maybe (a -> b) -> Maybe a -> Maybe b
  this.apply = function(m){
    if(typeof (this.val) !== 'function'){
      throw new Error('Expected function but got ' + typeof (this.val) + ' in function Just.apply');
    }else if(m.type !== 'Maybe'){
      throw new Error('Expected Maybe but got ' + typeof m + ' in the first argument of Just.apply')
    }
    if(m === Nothing) return Nothing;
    else{
      return new Just( val (m.val) );
    }
  }

  // bind :: Maybe a -> (a -> Maybe b) -> Maybe b
  this.bind = function(f) {
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in function Just.bind');
    }
    var res = f(this.val);
    if(res.type !== 'Maybe'){
      throw new Error('Expected Maybe but got ' + typeof res + ' in the return type of Just.bind');
    }
    return res;
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Maybe';
}

Just.prototype.toString = function(){
  return "Just " + (this.val.toString());
}

module.exports = {
  Just : Just,
  Nothing : Nothing,
  pure : function(val) {
    return Maybe.Just(val);
  }
}