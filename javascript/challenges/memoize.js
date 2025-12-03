//LEVEL: MEDIUM

//Memoize function based on argument. If same arguments provided, the function should not compute the values again
// Todo:
// 1) See if this is a different question? -> https://youtu.be/A9wQBAipiVo 
// 2) In solution 1), use fn.apply(this, ...args) instead of directly calling fn(...args). This way if we can use memo for object methods too

// ----------------------------------------- 1) Using JSON.stringify ------------------------------------------------------------//
function memoGeneratorUsingJSONStringify(fn) {
  //Map to store cached values
  const cachedResults = new Map();
  
	return function(...args){
    const argsJSON = JSON.stringify(args);
    
    if(cachedResults.has(argsJSON)) {
      console.log("from cache:");
      return cachedResults.get(argsJSON);
    }
    
    const result = fn(...args);
    cachedResults.set(argsJSON, result)
    console.log("not from cache:");
    return result;
  }
}

// ------------------------------------ 2) Using decoraters: https://javascript.info/call-apply-decorators ------------------------//
function memoGeneratorUsingDecoraters(fn) {
  //Add code here...
}

// -------------------- 3) JScafe Solution: https://youtu.be/Mip6ejPRXko?list=PLe3J6mZBq1xUWVBMpSR2zpp8paWMJQ91b -------------------//

//testcases :
const area = a => a * a;
const sub = (a, b) => a -b;
const sum = (a, b) => a + b;
const arraySum = arr => arr.reduce((acc, curr) => acc + curr)

const memoArea = memoGeneratorUsingJSONStringify(area);
const memoSub = memoGeneratorUsingJSONStringify(sub);
const memoSum = memoGeneratorUsingJSONStringify(sum)
const memoArraySum = memoGeneratorUsingJSONStringify(arraySum)

//Testcases
console.log(memoArea(4)) // 16 // not from cache
console.log(memoArea(4)) // 16 // from cache
console.log(memoArea(3)) // 9 // not from cache
console.log(memoArea(4)) // 16 // From cache
console.log(memoArea(3)) // 9 // from cache

console.log(memoSub(4, 3)) // 1 // not from cache
console.log(memoSub(3, 4)) // -1 // not from cache
console.log(memoSub(4, 3)) // 1 // from cache
console.log(memoSub(3, 4)) // -1 // from cache

console.log(memoSum(4, 3)) // 7 // not from cache
console.log(memoSum(3, 4)) // 7 // not from cache
console.log(memoSum(4, 3)) // 7 // from cache
console.log(memoSum(3, 4)) // 7 // from cache

console.log(memoArraySum([1,2,3])) // 6 Not from cache
console.log(memoArraySum([1,2,3])) // 6 from cache
console.log(memoArraySum([2,3])) // 5 Not from cache
console.log(memoArraySum([2,3])) // 5 from cache
console.log(memoArraySum([1,2,3])) // 6 from cache