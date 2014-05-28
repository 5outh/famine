var Identity = require('./Identity'),
    Either   = require('./Either'),
    List     = require('./List'),
    Maybe    = require('./Maybe'),
    Monoid   = require('./Monoid'),
    Reader   = require('./Reader'),
    State    = require('./State'),
    Tuple    = require('./Tuple'),
    Writer   = require('./Writer');

module.exports = {
  Identity : { pure : function(x){ return Identity(x); } },
  Either : {
    pure : function(x){
      return Either.Right(x);
    }
  }, List : {
    pure : function(x){
      return List([x]);
    }
  }, Maybe : {
    pure : function(val) {
      return Just(val);
    }
  }, Reader : {
    pure : function(m){
      return Reader(function(r){
        return m;
      });
    }
  }, State : {
    pure : function(a){
      return State(function(s){
        return Tuple(a, s);
      });
    }
  }, Tuple : function(monoid){
    return { 
      pure : function(b){
        return Tuple(monoid.mempty, b);
      }
    }
  }, Writer : function(monoid){
    return {
      pure : function(val){
        return Writer(monoid, monoid.mempty, val);
      }
    }
  }
}