//@todo :
//1) map and filter: add support for 2nd argument also (i.e. context)
//2) map and filter: add support for using map generically (i.e. with other types like Strings, Objects etc.) 


// ----------------------------------------- MAP ------------------------------------------------------------//
Array.prototype.fbMap = function(callbackFunc){
	let out = []
  /**
    * Length should remain constant even if the array is being modified in callback function
    * map, filter and reduce will loop though original length only
  */
  const len = this.length; 
  /**
   * If the callback function is removing elements from original array then we need to loop only till last element
   * So we do Math.min(len, this.length)
   */
  for(let i = 0; i < Math.min(len, this.length); i++){
    let val = this[i] ? callbackFunc(this[i]) : this[i]
    out.push(val)
  }
  return out
}


// ----------------------------------------- FILTER ------------------------------------------------------------//
Array.prototype.fbFilter = function(callbackFunc){
	let out = []
  const len = this.length;
  for(let i = 0; i < Math.min(len, this.length); i++){
    if(callbackFunc(this[i], i, this)) out.push(this[i])
  }
  return out
}


// ----------------------------------------- REDUCE ------------------------------------------------------------//
Array.prototype.fbReduce = function(callbackFunc, initial){
	let out = initial, k = 0;
  const len = this.length; 
  if(!out){
    out = arr[0]
    k = 1
  }
  for(let i = k; i < Math.min(len, this.length); i++){
    out = callbackFunc(out, this[i])
  }
  return out
}

// ----------------------------------------- SORT ------------------------------------------------------------//
Array.prototype.fbSort = function(callbackFunc, initial){
  //Add code here...
}

// ---------------------------------------- Tests -------------------------------------------------------------- //
console.log("================================Tests================================")
let arr = [1,2,6,3,4,5,5,2,4,1];

//Map
console.log(arr.fbMap(d => d * 2))

//Filter
console.log(arr.fbFilter(d => d > 2))

//Reduce
console.log(arr.fbReduce((acc, curr) => acc + curr, 2))
console.log(arr.reduce((acc, curr) => acc + curr, 2))

console.log(arr.reduce((acc, curr) => Math.max(acc, curr)))
console.log(arr.fbReduce((acc, curr) => Math.max(acc, curr)))

console.log(arr.reduce((acc, curr) => {
    if(!acc[curr]){
    	acc[curr] = 1	
    } else {
    	acc[curr] += 1
    }
    return acc
}, {}))
console.log(arr.fbReduce((acc, curr) => {
    if(!acc[curr]){
    	acc[curr] = 1	
    } else {
    	acc[curr] += 1
    }
    return acc
}, {}))

// ---------------------------------------- More -------------------------------------------------------------- //

console.log("================================More================================")
//Usecase of second argument in map (i.e. context)
a = {
  foo: 'bar',
  things: [1, 2, 3],
  showFooForEach: function() {
    this.things.map(function(thing) {
      console.log(this.foo, thing);
    });
  }
}

a.showFooForEach(); //This will print 'undefined' for first argument of console.log unless we pass 'this' as 2nd argument in map

//Polyfills from MDN website
//Map
Array.prototype.map = function(callback/*, thisArg*/) {

  var T, A;
  var k = 0;

  var O = Object(this);

  if (arguments.length > 1) {
    T = arguments[1];
  }

  A = new Array(len);

  while (k < len) {
    var kValue, mappedValue;
    if (k in O) {
      kValue = O[k];
      mappedValue = callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }
  return A;
};