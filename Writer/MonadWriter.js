var Writer = require('./Writer'),
    Tuple  = require('../Tuple/Tuple');

module.exports = function(monoid){
  return {
    listen : function(m){
      if(!(m instanceof Writer && m.type === 'Writer')) {
        throw new Error('Expected Writer but got ' + typeof m + ' in the first argument of MonadWriter.listen');
      }
      var next = m.runWriter();
      return new Writer(next.monoid, new Tuple(new Tuple(next.val, next.log), next.log) );
    },

    pass : function(m){
      if(!(m instanceof Writer && m.type === 'Writer')) {
        throw new Error('Expected Writer but got ' + typeof m + ' in the first argument of MonadWriter.pass');
      }
      var next = m.runWriter();
      return new Writer(next.monoid, next.fst.fst, (next.fst.snd)(next.snd));
    },

    pure : function(val){
      return new Writer(monoid, monoid.mempty, val);
    }
  }
}