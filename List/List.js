// The List Monad

var List = function(vals){
  // fmap :: (a -> b) -> List a -> List b
  var fmap = function(f){
    var ret = [];
    for(var i = 0; i < vals.length; i++){
      ret.push(f(vals[i]));
    }
    return List(ret);
  }

  // apply :: List (a -> b) -> List a -> List b
  var apply = function(list){
    // vals is a list of functions
    var ret = [];
    for(var i = 0; i < vals.length; i++){
      var curList = list.fmap(val);
      ret = ret.concat(curList.val);
    }
    return List(ret);
  }
  // bind :: List a -> (a -> List b) -> List b
  var bind = function(f){
    var lists = fmap(f).val,
        ret = [];
    for(var i = 0; i < lists.length; i++){
      var curList = lists[i];
      ret = ret.concat(curList.val);
    }
    return List(ret);
  }

  return {
    val : vals,
    fmap : fmap,
    bind : bind
  }
}

// console.log(List([1, 10, 100]).bind(function(x){
//   return List([x + 10, x * 10, x - 3]);
// }));

module.exports = List
