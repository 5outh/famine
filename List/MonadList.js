var List = require('./List');

module.exports = {
  pure : function(x){
    return List([x]);
  }
}