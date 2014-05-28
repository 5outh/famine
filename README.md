famine
=== 

### Functors, Applicatives, Monads, etc. (For node.js)

Right now, famine is two things:

1. An experiment on how close I can emulate Haskell's wonderful data types in Javascript, and
2. A tool for Haskell developers (or other functional programmers) to use what they already know\* in a programming language not equipped with the same constructs.

\* As it stands, famine imposes a lot of trust in the user. I'm working to rectify this, but due to Javascript being untyped, much of famine will only be useful if the user already understands the concept of the data type being used. If you're unfamiliar with them, or need to brush up on what  Functors/Monads/Applicatives are all about, check out the Haskell [typeclassopedia](http://www.haskell.org/haskellwiki/Typeclassopedia).

To use:
```javascript
var famine = require('famine'),
    Maybe = famine.Maybe, //contains `fmap`, `apply` (<*>), `bind` (>>=)
    MonadMaybe = famine.MonadMaybe; //contains `pure` (i.e. `return` in haskell)

var a = Maybe.Just(3);
var maybeComp = a.bind(function(x){
  return MonadMaybe.pure(x+3);
}).fmap(function(x){
  return x*2;
}); // Just 18
```

Each of the included data types have `famine.X` and `famine.MonadX` included, with `pure` being a member of `MonadX` and other instance functions (`fmap`, `apply`, `bind`, etc) as above. Sum types like `Maybe` and `Either` export their inner types as members, like `Maybe.Just` above. Product types can be constructed by the `require`d variable, like `List`, for instance:

```javascript
var List = require('famine').List;

var xs = List([1, 2, 3]);
// ... and so on
```

Todos:

1. Handle "typing" errors.
2. Add a `Parser` Instance (a la `Parsec`).
3. Monad Transformers
4. Expand on the "Etc" part -- Make other instances (bifunctor, comonad, foldable, traversable, etc).
5. Documentation!