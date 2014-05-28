// The List Monad

var List = function(vals){

  // protect against no `new` keyword when building.
  if(!(this instanceof List)){
    return new List(vals);
  }

  this.val = vals;
  
  // fmap :: (a -> b) -> List a -> List b
  this.fmap = function(f){
    var ret = [];
    for(var i = 0; i < this.val.length; i++){
      ret.push(f(this.val[i]));
    }
    return new List(ret);
  }

  // apply :: List (a -> b) -> List a -> List b
  this.apply = function(list){
    // vals is a list of functions
    var ret = [];
    for(var i = 0; i < this.val.length; i++){
      var curList = list.fmap(this.val[i]);
      ret = ret.concat(curList.val);
    }
    return new List(ret);
  }
  // bind :: List a -> (a -> List b) -> List b
  this.bind = function(f){
    var lists = this.fmap(f).val,
        ret = [];
    for(var i = 0; i < lists.length; i++){
      var curList = lists[i];
      ret = ret.concat(curList.val);
    }
    return new List(ret);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'List';
}

module.exports = List
