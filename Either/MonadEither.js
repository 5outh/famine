var Either = require('./Either');

module.exports = {
  pure : function(x){
    return Either.Right(x);
  }
}