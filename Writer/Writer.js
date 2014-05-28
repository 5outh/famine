var Monoid = require('../Monoid/Monoid'),
    Tuple  = require('../Tuple/Tuple');

// Writer w a = Writer { runWriter :: (a, w) }  
var Writer = function(w, log, val){

  this.val = val;
  this.log = log;
  this.monoid = w;

  this.runWriter = function(){
    return new Tuple(this.val, this.log);
  }

  this.fmap = function(f){
    return new Writer(this.monoid, this.log, f(this.val));
  }

  // apply : Writer w (a -> b) -> Writer w a -> Writer w b
  this.apply = function(writer){
    return writer.fmap(val);
  }

  this.bind = function(f){
    var next = f(val);
    return new Writer(this.monoid, this.monoid.mappend(this.log, next.log), next.val);
  }

  this.tell = function(phrase){
    return new Writer(this.monoid, this.monoid.mappend(this.log, phrase), this.val);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Writer';
}

module.exports = Writer;
