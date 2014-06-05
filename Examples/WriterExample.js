var famine = require('../famine'),
    Writer = famine.Writer,
    Monoid = famine.Monoid;


// An example of the `factorial` function in iterative `Writer` style.
var tellFactorial = function(n){

  // start at 1, and collect string values.
  var writer = Writer.of(new Monoid.StringM(), 1);
  
  while(n > 0){
    
    // replace the writer's inner value and log a message.
    writer = writer.chain(function(x){
      return Writer.of(new Monoid.StringM(), x * n);
    }).tell("Multiplied by: " + n + "\n");

    // once the writer has been replaced, tell about the new value.
    writer = writer.tell("New Value: " + writer.val + "\n");
    
    n--;
  }
  
  return writer;
}

console.log(tellFactorial(5).runWriter().snd); // logs the execution of factorial(5)