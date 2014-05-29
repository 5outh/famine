var Monoid = require('../Monoid/Monoid'),
    Tuple  = require('../Tuple/Tuple');

// Writer w a = Writer { runWriter :: (a, w) }  
var Writer = function(w, log, val){
  
  // protect against no `new` keyword when building.
  if(!(this instanceof Writer)){
    return new Writer(w, log, val);
  }

  if(!w.monoid){
    throw new Error('Expected Monoid in the first argument of the constructor for Writer but got something else');
  }

  this.val = val;
  this.log = log;
  this.monoid = w;

  this.runWriter = function(){
    return new Tuple(this.val, this.log);
  }

  this.fmap = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Writer.fmap');
    }
    return new Writer(this.monoid, this.log, f(this.val));
  }

  // apply : Writer w (a -> b) -> Writer w a -> Writer w b
  this.apply = function(writer){
    if(typeof this.val !== 'function'){
      throw new Error('Expected function but got ' + typeof (this.val) + ' in the value of Writer in Writer.apply'); 
    }else if(!(writer instanceof Writer && writer.type === 'Writer')) {
      throw new Error('Expected Writer but got ' + typeof writer + ' in the first argument of Writer.apply');
    }

    return writer.fmap(this.val);
  }

  this.bind = function(f){
    if(typeof f !== 'function'){
      throw new Error('Expected function but got ' + typeof f + ' in the first argument of Writer.bind'); 
    }

    var next = f(val);

    if(!(next instanceof Writer && next.type === 'Writer')) {
      throw new Error('Expected Writer but got ' + typeof next + ' in the variable next in Writer.bind');
    }

    return new Writer(this.monoid, this.monoid.mappend(this.log, next.log), next.val);
  }

  this.tell = function(phrase){
    if(typeof phrase !== typeof this.monoid.mempty){
      throw new Error('Expected ' + typeof (monoid.mempty) + ' but got ' + typeof phrase + ' in the first argument of Writer.tell');
    }
    return new Writer(this.monoid, this.monoid.mappend(this.log, phrase), this.val);
  }

  this.functor = true;
  this.applicative = true;
  this.monad = true;
  this.type = 'Writer';
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

Writer.pure = function(monoid, val){
  return new Writer(monoid, monoid.mempty, val);
}

module.exports = Writer;
