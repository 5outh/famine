var famine = require('../famine'),
    Writer = famine.Writer,
    MonadWriter = famine.MonadWriter,
    Monoid = famine.Monoid;


// An example of the `factorial` function in iterative `Writer` style.
var tellFactorial = function(n){

  // a Writer for String "logs"  
  var StringWriter = MonadWriter(Monoid.StringM);
  // start at 1
  var writer = StringWriter.pure(1);
  
  while(n > 0){
    
    // replace the writer's inner value and log a message.
    writer = writer.bind(function(x){
      return StringWriter.pure(x * n);
    }).tell("Multiplied by: " + n + "\n");

    // once the writer has been replaced, tell about the new value.
    writer = writer.tell("New Value: " + writer.val + "\n");
    
    n--;
  }
  
  return writer;
}

console.log(tellFactorial(5).runWriter().snd); // logs the execution of factorial(5)