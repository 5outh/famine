famine
=== 

### Functors, Applicatives, Monads, etc. (For node.js)

Right now, famine is two things:

1. An experiment on how close I can emulate Haskell's wonderful data types in Javascript, and
2. A tool for Haskell developers (or other functional programmers) to use what they already know\* in a programming language not equipped with the same constructs.

\* As it stands, famine imposes a lot of trust in the user. I'm working to rectify this, but due to Javascript being untyped, much of famine will only be useful if the user already understands the concepts of famine's data types. If you're unfamiliar with these types, or need to brush up on Functors/Applicatives/Monads, check out the [Haskell typeclassopedia](http://www.haskell.org/haskellwiki/Typeclassopedia).

To use: Check out the `Examples` folder for various usage of `famine`.

Famine currently exports "the usual suspects" as data types, each implementing Functor, Applicative and Monad:

1. Identity (The trivial Functor/Monad, also a Comonad)
2. Maybe
3. List
4. Either
5. Writer
6. State

Famine also exports some common Monoids and 2-Tuples.

All data types lie in accordance with the Fantasy Land specification.

![so fantastic](fantasy-land-logo.png);

Todos:

1. Documentation!
2. Expand on the "Etc" part -- Make other instances (bifunctor, comonad, foldable, traversable, etc).
3. Monad Transformers?
