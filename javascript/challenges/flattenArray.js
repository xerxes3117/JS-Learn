//LEVEL: EASY

//Follow up:
//1) Method 1: Can we do this without using separate helper function (use concat to add to out array i.e. out = out.concat(flattenArray(arr)))
//2) How to do this using inbuilt functions (array.flat, flatMap)

// -------------------------------- Method 1 : Recursion -------------------------------//

function flattenArray(arr){
	let out = []
  flattenHelper(arr, out)
  return out
}

function flattenHelper(arr, out){
	for(let i = 0; i < arr.length; i++){
  	if(!Array.isArray(arr[i])){
    	out.push(arr[i])
    } else {
    	flattenHelper(arr[i], out)
    }
  }
}

let arr = [1,[2,3,4, [5,6,7]], 8, 9, 10, [11,12,13]]
console.log(flattenArray(arr))
let arr1 = [1,2,3,4,5,6,7,8,9,10, 11,12,13]
console.log(flattenArray(arr1))

// -------------------------------- Method 2 : Using Reduce -------------------------------//
function flattenArray(arr){
  return arr.reduce((acc, curr) => {
    if(Array.isArray(curr)){
      return [...acc, ...flattenArray(curr)];
    } else {
      return [...acc, curr];
    }
  }, [])
}

//Test Cases
let arr2 = [1,[2,3,4, [5,6,7]], 8, 9, 10, [11,12,13]]
console.log(flattenArray(arr2))
let arr3 = [1,[2,3,4, [5,[6,7]]], 8, 9, 10, [11,12,13]]
console.log(flattenArray(arr3))
let arr4 = [1,2,3,4,5,6,7, 8, 9, 10, ,11,12,13]
console.log(flattenArray(arr4))