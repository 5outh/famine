// Tuples

var Tuple = function(a, b){

  // protect against no `new` keyword when building.
  if(!(this instanceof Tuple)){
    return new Tuple(a, b);
  }

  this.fst = a;
  this.snd = b;
  this.type = "Tuple";
}

Tuple.prototype.toString = function(){
  return "(" + this.fst + "," + this.snd + ")";
}

module.exports = Tuple;