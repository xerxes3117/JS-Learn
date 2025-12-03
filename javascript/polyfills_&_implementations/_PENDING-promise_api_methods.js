// ----------------------------------------- Promise.all ------------------------------------------------------------//
/**
	Guidelines:
  	1) Takes an array of promises and returns a new promise
  	2) The new promise resolves when all listed promises are resolved, and the array of their results becomes its result
    3) All the promises are executed in parallel and not sequentially
  	4) The order of the resulting array members is the same as in its source promises
  	5) If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error
*/
Promise.customAll = (promiseArr) => {
  const resultArr = [];
  let counter = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
        .then((res) => {
          resultArr[i] = res;
          counter++;
          if (counter === promiseArr.length) {
            resolve(resultArr);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

function logResult(res) {
  console.log(res);
}

Promise.customAll([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(logResult); // 1,2,3 when promises are ready: each promise contributes an array member

// ----------------------------------------- Promise.allSettled ------------------------------------------------------------//
/**
	Guidelines:
*/

// ----------------------------------------- Promise.any ------------------------------------------------------------//
/**
	Guidelines:
*/

// ----------------------------------------- Promise.race ------------------------------------------------------------//
/**
	Guidelines:
*/
