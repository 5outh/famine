FAME : Functors, Applicatives, Monads, Etc. (For node.js).
====

Right now, this is mainly two things:

1. An experiment on how close I can emulate Haskell's data types in Javascript, and
2. A tool for Haskell developers (or other functional programmers) to use what they know and love in a programming language not equipped with the same constructs.

To use:
```javascript
var fame = require('fame'),
    Maybe = fame.Maybe, //contains `fmap`, `apply` (<*>), `bind` (>>=)
    MonadMaybe = fame.MonadMaybe; //contains `pure` (i.e. `return` in haskell)

var a = Maybe.Just(3);
var maybeComp = a.bind(function(x){
  return MonadMaybe.pure(x+3);
}).fmap(function(x){
  return x*2;
}); // Just 18
```

Each of the included data types have `fame.X` and `fame.MonadX` included, with `pure` being a member of `MonadX` and other instance functions (`fmap`, `apply`, `bind`, etc) as above. Sum types like `Maybe` and `Either` export their inner types as members, like `Maybe.Just` above. Product types can be constructed by the `require`d variable, like `List`, for instance:

```javascript
var List = require('fame').List;

var xs = List([1, 2, 3]);
// ... and so on
```

Todos:

1. Handle "typing" errors.
2. Add a `Parser` Instance (a la `Parsec`).
3. Monad Transformers
4. Expand on the "Etc" part -- Make other instances (bifunctor, comonad, foldable, traversable, etc).
5. Documentation!
