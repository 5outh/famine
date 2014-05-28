// Identity
var Identity = function(val){
  var fmap = function(f){
    return Identity(f(val));
  }
  
  // apply :: Identity (a -> b) -> Identity a -> Identity b
  var apply = function(id){
    return Identity( val( id.val ) );
  }

  var bind = function(f){
    return f(val);
  }

  return {
    val : val,
    fmap : fmap,
    apply : apply,
    bind : bind
  }
}

module.exports = Identity;