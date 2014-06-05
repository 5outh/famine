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
  if(this.fst instanceof Array){
    this.fst = '[' + this.fst + ']'
  }
  if(this.snd instanceof Array){
    this.snd = '[' + this.snd + ']'
  }
  return "(" + this.fst + "," + this.snd + ")";
}

module.exports = Tuple;