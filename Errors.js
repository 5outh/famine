var argError = function(prop, a, expectedType, whichArg, fName){
  if(prop){
    throw new Error('Expected ' + expectedType + ' but got ' + typeof a + ' in the ' + whichArg + ' argument of ' + fName);
  }
}

var varError = function(prop, a, expectedType, fName){
  if(prop){
    throw new Error('Expected ' + a + ' to be a ' + expectedType + ' in ' + fName);
  }
}

var returnTypeError = function(prop, a, expectedType, fName){
  if(prop){
    throw new Error('Expected ' + expectedType + ' but got ' + typeof a + ' in the return type of ' + fName);
  }
}

module.exports = {
  argError : argError,
  varError : varError,
  returnTypeError : returnTypeError
}