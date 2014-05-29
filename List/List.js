// The List Monad

var List = function(vals){

  // protect against no `new` keyword when building.
  if(!(this instanceof List)){
    return new List(vals);
  }

  this.val = vals;

  if(!(this.val instanceof Array)){
    throw new Error('Expected Array but got something else in the constructor of List');
  }
  
  // fmap :: (a -> b) -> List a -> List b
  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of List.fmap');
    }
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
      var cur = (this.val)[i];
      if(typeof cur !== 'function'){
        throw new Error('Expected function but got ' + typeof cur + ' in the ' + i + 'th index of vals in List.apply');
      }
      var curList = list.fmap(cur);
      ret = ret.concat(curList.val);
    }
    return new List(ret);
  }
  // bind :: List a -> (a -> List b) -> List b
  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of List.bind');
    }
    var lists = this.fmap(f).val,
        ret = [];
    for(var i = 0; i < lists.length; i++){
      var curList = lists[i];
      if(!(curList.type === 'List' && curList instanceof List) ){
        throw new Error('Expected List but got ' + typeof curList + ' in the ' + i + 'th index of vals in List.bind');
      }
      ret = ret.concat(curList.val);
    }
    return new List(ret);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'List';
}

List.pure = function(x){
  return List([x]);
}

List.prototype.toString = function(){
  return "List " + (this.val.toString());
}

module.exports = List
