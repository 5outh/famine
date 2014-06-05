// The List Monad
var Errors = require('../Errors'),
    TC = require('../TypeChecker');


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
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'List.map');
  var ret = [];
  for(var i = 0; i < this.val.length; i++){
    ret.push(f(this.val[i]));
  }
  return new List(ret);
}

List.prototype.ap = function(list){
  // vals is a list of functions
  var ret = [];

  Errors.argError(!(list instanceof List && list.type === 'List'), list, 'List', 'first', 'List.ap');

  for(var i = 0; i < this.val.length; i++){
    var cur = (this.val)[i];

    Errors.varError(!TC.isFunction(cur), 'List.val[' + i + ']', 'function', 'List.ap');
    
    var curList = list.map(cur);
    ret = ret.concat(curList.val);
  }
  return new List(ret);
}

List.prototype.chain = function(f){
  Errors.argError(!TC.isFunction(f), f, 'function', 'first', 'List.chain');

  var lists = this.map(f).val,
      ret = [];
  for(var i = 0; i < lists.length; i++){
    var curList = lists[i];
    Errors.returnTypeError(!(curList instanceof List && curList.type === 'List'), curList, 'List', 'List.chain');
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