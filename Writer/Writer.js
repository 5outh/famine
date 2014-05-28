var Monoid = require('../Monoid/Monoid'),
    Tuple  = require('../Tuple/Tuple');

// Writer w a = Writer { runWriter :: (a, w) }  
var Writer = function(w, log, val){
  var runWriter = function(){
    return Tuple(val, log);
  }

  var fmap = function(f){
    return Writer(w, log, f(val));
  }

  // apply : Writer w (a -> b) -> Writer w a -> Writer w b
  var apply = function(writer){
    return writer.fmap(val);
  }

  var bind = function(f){
    var next = f(val);
    return Writer(w, w.mappend(log, next.log), next.val);
  }

  var tell = function(phrase){
    return Writer(w, w.mappend(log, phrase), val);
  }

  // listen m = Writer $ let (a, w) = runWriter m in ((a, w), w)
  var listen = function(m){
    var next = m.runWriter();
    return Writer(w, Tuple(Tuple(next.val, next.log), next.log) );
  }
  // pass m = Writer $ let ((a, f), w) = runWriter m in (a, f w)
  var pass = function(m){
    var next = m.runWriter();
    return Writer(w, next.fst.fst, (next.fst.snd)(next.snd));
  }

  return {
    monoid : w,
    log : log,
    val : val,
    fmap : fmap,
    bind : bind,
    tell : tell,
    listen : listen,
    pass : pass,
    runWriter : runWriter
  }
}

// The monad instance for Writer. Requires a monoid in the first argument.
// For example, WriterMonad(StringM, 1);
var WriterMonad = function(monoid){
  return {
    Writer : function(log, val){
      return Writer(monoid, log, val);
    },
    pure : function(val){
      return Writer(monoid, monoid.mempty, val);
    }
  }
}

// A Writer for String "logs"
// var StringWriter = WriterMonad(Monoid.StringM);

// var baseExample = 
//   StringWriter.pure(1).bind(function(x){
//     return StringWriter.Writer("adding 10 (got " + (x+10) + ")!\n", x+10);
//   }).bind(function(x){
//     return StringWriter.Writer("multiplying by 100 (got " + (x*100) + ")!", x * 100);
//   }).log

// var tellExample = StringWriter.pure(1).tell("What's up?\n").bind(function(x){
//     return StringWriter.pure("Just said, what's up?");
//   }).log

// An example of the `factorial` function in iterative `Writer` style.
// var tellFactorial = function(n){
//   var writer = WriterMonad(Monoid.StringM).pure(1);
  
//   while(n > 0){
    
//     // replace the writer's inner value and log a message.
//     writer = writer.bind(function(x){
//       return StringWriter.pure(x * n);
//     }).tell("Multiplied by: " + n + "\n");

//     // once the writer has been replaced, tell about the new value.
//     writer = writer.tell("New Value: " + writer.val + "\n");
    
//     n--;
//   }
  
//   return writer;
// }

// console.log(tellFactorial(5).runWriter().snd);

module.exports = Writer;
