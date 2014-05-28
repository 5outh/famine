// Really just provided as an example of how to construct transformers.
var IdentityT = function(m){
  this.runIdentityT = m;
}

var MonadIdentityT = {
  lift : function(ma){
    if(!(ma && ma.monad)){
      throw new Error("Attempt to lift non-monadic value into IdentityT.");
    }
    return new IdentityT(ma);
  }
}