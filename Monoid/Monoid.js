var StringM = function(){
  this.empty = function(){ return ""; };
  this.concat = function(x, y){
    return x + y;
  }
};

var ListM = function(){
  this.empty = function(){ return []; };
  this.concat = function(x, y){
    return x.concat(y);
  };
};

var Sum = function(){
  this.empty = function(){ return 0; };
  this.concat = function(x, y){
    return x + y;
  };
};

var Product = function(){
  this.empty = function(){ return 1; };
  this.concat = function(x, y){
    return x * y;
  };
};

module.exports = {
  StringM : StringM,
  ListM : ListM,
  Sum : Sum,
  Product : Product
}