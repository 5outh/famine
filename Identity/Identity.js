// Identity
var Identity = function(val){
  
  this.val = val;

  // fmap :: (a -> b) -> Identity a -> Identity b
  this.fmap = function(f){
    return new Identity(f(val));
  }
  
  // apply :: Identity (a -> b) -> Identity a -> Identity b
  this.apply = function(id){
    return new Identity( val( id.val ) );
  }
  // cobind :: Identity a -> (Identity a -> b) -> Identity b
  this.cobind = function(f){
    console.log(this);
    return new Identity ( f ( this ) );
  }

  // bind :: Identity a -> (a -> Identity b) -> Identity b
  this.bind = function(f){
    return f(val);
  }

  this.type = 'Identity';
  
  this.functor     = true;
  this.applicative = true;
  this.monad       = true;
  this.comonad     = true;
  this.type = 'Identity';
}

module.exports = Identity;