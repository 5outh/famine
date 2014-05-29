var Monoid = require('./Monoid/Monoid');
var Either = require('./Either/Either'),
    Identity = require('./Identity/Identity'),
    List = require('./List/List'),
    Maybe = require('./Maybe/Maybe'),
    State = require('./State/State'),
    Writer = require('./Writer/Writer'),
    Tuple = require('./Tuple/Tuple');

module.exports = {
  Either : Either,
  Identity : Identity,
  List : List,
  Maybe : Maybe,
  State : State,
  Writer : Writer,
  Tuple : Tuple,
  Monoid : Monoid,
  id : function(n){ return n; },
  const : function(y){ return function(){ return y; } }
}