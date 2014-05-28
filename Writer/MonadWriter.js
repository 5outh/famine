var Writer = require('./Writer'),
    Tuple  = require('../Tuple/Tuple');

module.exports = function(monoid){
  return {
    // listen m = Writer $ let (a, w) = runWriter m in ((a, w), w)
    listen : function(m){
      var next = m.runWriter();
      return new Writer(next.monoid, new Tuple(new Tuple(next.val, next.log), next.log) );
    },

    // pass m = Writer $ let ((a, f), w) = runWriter m in (a, f w)
    pass : function(m){
      var next = m.runWriter();
      return new Writer(next.monoid, next.fst.fst, (next.fst.snd)(next.snd));
    },

    pure : function(val){
      return new Writer(monoid, monoid.mempty, val);
    }
  }
}