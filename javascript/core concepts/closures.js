//Learning about closures

//how to create private variable using closure?
function CreateVar() {
  var privateVar = 0;
  this.getVar = function() {
    return privateVar
  }
  this.increment = function() {
    privateVar++
  }
}

let increment = new CreateVar();
console.log(increment());
console.log(increment());
console.log(increment());

//Closure with setTimeout and loops
// ----------------------------------------------------- Setimeout interview questions -----------------------------------------------------------------------------
// https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
// @todo: Run all these with debugger and check state in scope chain and call stack
//Using var
function x0() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function() {
      console.log(i);
    }, i*1000);
  }
}

//Using let
function x1() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function() {
      console.log(i);
    }, i*1000);
  }
}

//IIFE
function x2() {
  for (var i = 1; i <= 5; i++) {
    (function inner(i){
      setTimeout(function () {
        console.log(i);
      }, i*1000);
    })(i);
  }
}

//Using another function
function x5() {
  for (var i = 1; i <= 5; i++) {
    function close(j) {
      setTimeout(function () {
        console.log(j);
      }, j * 1000);
    }
    close(i);
  }
}

//Using arrow function
function x3() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(() => console.log(i), i*1000);
  }
}

//Using forEach function
function x4() {
  var arr = [1,2,3,4,5];
  arr.forEach(function(d) {
    setTimeout(function () {
      console.log(d)
    }, d * 1000)
  });
}

// console.log("Running x0() using var");
// x0();
// console.log("Running x1() using let");
// x1();
// console.log("Running x2() using iife");
// x2();
// console.log("Running x3() using arrow function");
// x3();
// console.log("Running x4() using forEach");
// x4();
// console.log("Running x5() using another nested function");
// x5();

//closure with hooks
