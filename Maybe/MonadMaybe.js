var Maybe = require('./Maybe');


module.exports = {
  pure : function(val) {
    return Maybe.Just(val);
  }
}