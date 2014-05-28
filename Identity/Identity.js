// Identity
var Identity = function(val){
  
  this.val = val;

  // fmap :: (a -> b) -> Identity a -> Identity b
  this.fmap = function(f){
    return Identity(f(val));
  }
  
  // apply :: Identity (a -> b) -> Identity a -> Identity b
  this.apply = function(id){
    return Identity( val( id.val ) );
  }
  // cobind :: Identity a -> (Identity a -> b) -> Identity b
  this.cobind = function(f){
    console.log(this);
    Identity ( f ( this ) );
  }

  // bind :: Identity a -> (a -> Identity b) -> Identity b
  this.bind = function(f){
    return f(val);
  }
}

module.exports = Identity;