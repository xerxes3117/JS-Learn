//LEVEL: EASY

//Execute the given list of asynchronous functions in parallel and return the results as an array to the callback

function asyncParallel(asyncFuncs, callback){
let resultArr = []
let counter = 0
asyncFuncs.forEach(asyncFunc => {
  asyncFunc((data) => {
      resultArr.push(data)
      counter++
      if(counter == asyncFuncs.length) callback(resultArr)
    })
  })
}

// Testcase
function asyncFunc1(callback) {
  setTimeout(() => {
      callback(1);
  }, 3000);
}

function asyncFunc2(callback) {
  setTimeout(() => {
      callback(2);
  }, 2000);
}

function asyncFunc3(callback) {
  setTimeout(() => {
      callback(3);
  }, 1000);
}

asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], result => {
  console.log(result);                                            // 1, 2, 3 (prints results of each asynchronous function in order)
});