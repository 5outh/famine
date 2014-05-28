var Writer = require('./Writer');

module.exports = function(monoid){
  return {
    pure : function(val){
      return Writer(monoid, monoid.mempty, val);
    }
  }
}