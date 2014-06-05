var Monoid = require('../Monoid/Monoid'),
    Tuple  = require('../Tuple/Tuple'),
    TC     = require('../TypeChecker');

// Writer w a = Writer { runWriter :: (a, w) }  
var Writer = function(w, log, val){
  
  // protect against no `new` keyword when building.
  if(!(this instanceof Writer)){
    return new Writer(w, log, val);
  }

  if(!TC.isMonoid(w)){
    throw new Error('Expected Monoid in the first argument of the constructor for Writer but got something else');
  }

  this.val = val;
  this.log = log;
  this.monoid = w;
  this.type = 'Writer';
}

Writer.prototype.runWriter = function(){
  return new Tuple(this.val, this.log);
}

Writer.prototype.map = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of Writer.map');
  }
  return new Writer(this.monoid, this.log, f(this.val));
}

// apply : Writer w (a -> b) -> Writer w a -> Writer w b
Writer.prototype.ap = function(writer){
  if(typeof this.val !== 'function'){
    throw new Error('Expected function but got ' + typeof (this.val) + ' in the value of Writer in Writer.ap'); 
  }else if(!(writer instanceof Writer && writer.type === 'Writer')) {
    throw new Error('Expected Writer but got ' + typeof writer + ' in the first argument of Writer.ap');
  }

  return writer.fmap(this.val);
}

Writer.prototype.chain = function(f){
  if(typeof f !== 'function'){
    throw new Error('Expected function but got ' + typeof f + ' in the first argument of Writer.chain'); 
  }

  var next = f(this.val);

  if(!(next instanceof Writer && next.type === 'Writer')) {
    throw new Error('Expected Writer but got ' + typeof next + ' in the variable next in Writer.chain');
  }

  return new Writer(this.monoid, this.monoid.concat(this.log, next.log), next.val);
}

Writer.prototype.tell = function(phrase){
  if(typeof phrase !== typeof this.monoid.empty()){
    throw new Error('Expected ' + typeof (this.monoid.empty()) + ' but got ' + typeof phrase + ' in the first argument of Writer.tell');
  }
  return new Writer(this.monoid, this.monoid.concat(this.log, phrase), this.val);
}


Writer.listen = function(m){
  if(!(m instanceof Writer && m.type === 'Writer')) {
    throw new Error('Expected Writer but got ' + typeof m + ' in the first argument of MonadWriter.listen');
  }
  var next = m.runWriter();
  return new Writer(next.monoid, new Tuple(new Tuple(next.val, next.log), next.log) );
}

Writer.pass = function(m){
  if(!(m instanceof Writer && m.type === 'Writer')) {
    throw new Error('Expected Writer but got ' + typeof m + ' in the first argument of MonadWriter.pass');
  }
  var next = m.runWriter();
  return new Writer(next.monoid, next.fst.fst, (next.fst.snd)(next.snd));
}

Writer.of = function(monoid, val){
  return new Writer(monoid, monoid.empty(), val);
}

module.exports = Writer;
