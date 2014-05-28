famine
=== 

### Functors, Applicatives, Monads, etc. (For node.js)

Right now, famine is two things:

1. An experiment on how close I can emulate Haskell's wonderful data types in Javascript, and
2. A tool for Haskell developers (or other functional programmers) to use what they already know\* in a programming language not equipped with the same constructs.

\* As it stands, famine imposes a lot of trust in the user. I'm working to rectify this, but due to Javascript being untyped, much of famine will only be useful if the user already understands the concepts of famine's data types. If you're unfamiliar with these types, or need to brush up on Functors/Applicatives/Monads, check out the [Haskell typeclassopedia](http://www.haskell.org/haskellwiki/Typeclassopedia).

To use: Check out the `Examples` folder for various usage of `famine`.

Each of the included data types have `famine.X` and `famine.MonadX` included, with `pure` being a member of `MonadX` and other instance functions (`fmap`, `apply`, `bind`, etc) as members of `X`. Sum types like `Maybe` and `Either` export their inner types as members, like `Maybe.Just` in the example. Product types can be constructed by the `require`d variable, like `List`, in its example.

Todos:

1. Handle "typing" errors.
2. Add a `Parser` Instance (a la `Parsec`).
3. Monad Transformers
4. Expand on the "Etc" part -- Make other instances (bifunctor, comonad, foldable, traversable, etc).
5. Documentation!
