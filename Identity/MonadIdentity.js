var Identity = require('./Identity');

module.exports = {
  pure : function(x){ return new Identity(x); }
}