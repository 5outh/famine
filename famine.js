var Monoid = require('./Monoid/Monoid');
var Either = require('./Either/Either'),
    Identity = require('./Identity/Identity'),
    List = require('./List/List'),
    Maybe = require('./Maybe/Maybe'),
    Reader = require('./Reader/Reader'),
    State = require('./State/State'),
    Writer = require('./Writer/Writer'),
    Tuple = require('./Tuple/Tuple'),
    MonadEither = require('./Either/MonadEither'),
    MonadIdentity = require('./Identity/MonadIdentity'),
    MonadList = require('./List/MonadList'),
    MonadMaybe = require('./Maybe/MonadMaybe'),
    MonadReader = require('./Reader/MonadReader'),
    MonadState = require('./State/MonadState'),
    MonadWriter = require('./Writer/MonadWriter'),
    MonadTuple = require('./Tuple/MonadTuple');

module.exports = {
  Either : Either,
  Identity : Identity,
  List : List,
  Maybe : Maybe,
  Reader : Reader,
  State : State,
  Writer : Writer,
  Tuple : Tuple,
  MonadEither : MonadEither,
  MonadIdentity : MonadIdentity,
  MonadList : MonadList,
  MonadMaybe : MonadMaybe,
  MonadReader : MonadReader,
  MonadState : MonadState,
  MonadWriter : MonadWriter,
  MonadTuple : MonadTuple,
  Monoid : Monoid,
  id : function(n){ return n; }
}