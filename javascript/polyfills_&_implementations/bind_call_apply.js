// ---------------------------------------- Bind polyfill -------------------------------------------------------------- //
//1) Should allow custom context to be passed as this
//2) Should call bind with any provided arguments after context
//3) Should also call the original function with any provided arguments
//4) Should allow function borrowing

Function.prototype.myBind = function (...bindArgs) {
  var fnToCall = this;
  var bindParams = bindArgs.slice(1)
  function wrapper(...funcParams) {
    fnToCall.apply(bindArgs[0], [...bindParams, ...funcParams])
  }
  return wrapper;
};

Function.prototype.myBindWithoutApply = function (context, ...args) {
  context.fnToCall = this;
  return function (...funcParams) {
    allArguments = [...args, ...funcParams];
    return context.fnToCall(...allArguments);
  };
};

// ---------------------------------------- Call polyfill -------------------------------------------------------------- //
Function.prototype.myCall = function (context, ...args) {
  const tempContext = Object.create(context || null);
  tempContext.fnToCall = this;
  tempContext.fnToCall(...args);
};


// ---------------------------------------- Apply polyfill -------------------------------------------------------------- //
Function.prototype.myApply = function (context, args) {
  if(!Array.isArray(args)){
    console.log("CreateListFromArrayLike called on non-object")
    return
  }
  const tempContext = Object.create(context || null);
  tempContext.fnToCall = this;
  tempContext.fnToCall(...args);
};

// ---------------------------------------- Tests -------------------------------------------------------------- //
let customContext = { a: 1, b: 2 };
function testFunc(home, state, country) {
  console.log("final context is: ", this , " home: ", home, " state: ", state, " country: ", country);
}

console.log("calling inbuilt bind..");
var boundFunc = testFunc.bind(customContext, "dwarka", "delhi");
boundFunc("india");

console.log("calling mybind..");
var boundFuncCustom1 = testFunc.myBind(customContext, "dwarka", "delhi");
boundFuncCustom1("india");

console.log("calling myBindWithoutApply..");
var boundFuncCustom2 = testFunc.myBindWithoutApply(customContext, "dwarka", "delhi");
boundFuncCustom2("india");