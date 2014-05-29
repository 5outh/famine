famine
=== 

### Functors, Applicatives, Monads, etc. (For node.js)

Right now, famine is two things:

1. An experiment on how close I can emulate Haskell's wonderful data types in Javascript, and
2. A tool for Haskell developers (or other functional programmers) to use what they already know\* in a programming language not equipped with the same constructs.

\* As it stands, famine imposes a lot of trust in the user. I'm working to rectify this, but due to Javascript being untyped, much of famine will only be useful if the user already understands the concepts of famine's data types. If you're unfamiliar with these types, or need to brush up on Functors/Applicatives/Monads, check out the [Haskell typeclassopedia](http://www.haskell.org/haskellwiki/Typeclassopedia).

To use: Check out the `Examples` folder for various usage of `famine`.

Each of the included data types `X` implement the functions (`fmap`, `apply`, `bind`, etc) as members of `X`, with `pure` (`return` in Haskell) and `copure` (where applicable, `copure :: Comonad w => w a -> a`). Sum types like `Maybe` and `Either` export their inner types as members, like `Maybe.Just` in its example. Product types can be constructed by the `require`d variable, like `List`.

Famine currently exports "the usual suspects" as data types, each implementing Functor, Applicative and Monad:

1. Identity (The trivial Functor/Monad, also a Comonad)
2. Maybe
3. List
4. Either
5. Tuple
6. Writer
7. State

Famine also exports a `Monoid` data type, which can be used to build structures with appropriate `mempty` and `mappend` definitions.

Todos:

1. Documentation!
2. Expand on the "Etc" part -- Make other instances (bifunctor, comonad, foldable, traversable, etc).
3. Monad Transformers?
