var Identity = require('./Identity');

module.exports = {
  pure : function(x){ return new Identity(x); },
  copure : function(idx){ 
    if(!(idx instanceof Identity && idx.type === 'Identity')){
      throw new Error('Expected type Identity in first argument of MonadIdentity.copure, but got ' + typeof idx);
    }
    return idx.val;
  }
}