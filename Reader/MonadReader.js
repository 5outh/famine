var Reader = require('./Reader');

module.exports = {
  pure : function(m){
    return Reader(function(r){
      return m;
    });
  }
}