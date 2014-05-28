var Identity = require('./Identity');

module.exports = {
  pure : function(x){ return new Identity(x); },
  copure : function(idx){ return idx.val; }
}