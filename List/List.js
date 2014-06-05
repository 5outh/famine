// The List Monad

var List = function(vals){

  // protect against no `new` keyword when building.
  if(!(this instanceof List)){
    return new List(vals);
  }

  this.val = vals;
  this.type = 'List';

  if(!(this.val instanceof Array)){
    throw new Error('Expected Array but got something else in the constructor of List');
  }
}

List.prototype.map = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of List.map');
  }
  var ret = [];
  for(var i = 0; i < this.val.length; i++){
    ret.push(f(this.val[i]));
  }
  return new List(ret);
}

List.prototype.ap = function(list){
  // vals is a list of functions
  var ret = [];
  for(var i = 0; i < this.val.length; i++){
    var cur = (this.val)[i];
    if(typeof cur !== 'function'){
      throw new Error('Expected function but got ' + typeof cur + ' in the ' + i + 'th index of vals in List.ap');
    }
    var curList = list.map(cur);
    ret = ret.concat(curList.val);
  }
  return new List(ret);
}

List.prototype.chain = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of List.chain');
  }
  var lists = this.map(f).val,
      ret = [];
  for(var i = 0; i < lists.length; i++){
    var curList = lists[i];
    if(!(curList.type === 'List' && curList instanceof List) ){
      throw new Error('Expected List but got ' + typeof curList + ' in the ' + i + 'th index of vals in List.chain');
    }
    ret = ret.concat(curList.val);
  }
  return new List(ret);
}


List.of = function(x){
  return List([x]);
}

List.prototype.toString = function(){
  return '[' + (this.val.toString()) + ']';
}

module.exports = List;