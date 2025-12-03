//LEVEL: MEDIUM

//Create deep clone of object
//Resources:
// 1) https://www.digitalocean.com/community/tutorials/copying-objects-in-javascript 
// 2) https://github.com/sadanandpai/javascript-code-challenges/blob/main/challenges/objects-challenges.md#q3 
// 3) https://stackoverflow.com/a/18089155/8425685 
//@todo:
// 1) how to do the same if there are circular references present in the object
// 2) Pending issues with approach 3:
//    -  Function need to handled differently and individually. Currently you are not making clone in case of function keys.
//       So functions will be sharing scopes across cloneObj and originalObj.
//    -  Add and check a test case for keys having array inside arrays.


// -------------------------------- Method 1 : Object.assign (Clones only at top level) -------------------------------//
var student1 ={ 
  name : "Manish",
  company : "Gfg",
  info: {
    address: "delhi",
    phone: "981199119"
  }
}
var student2 =  { ...student1 } ;
var student4 = Object.assign({} ,student1) ;

// -------------------------------- Method 2 : Using JSON.stringify -------------------------------//

//This approach works only for non-method properties. Methods are not copied in clone because methods also contain a scope with them (see below code for example)
//See: https://stackoverflow.com/a/18089155/8425685
let obj = {
  name: 'scotch.io',
  exec: function exec() {
    return true;
  },
}

let method1 = Object.assign({}, obj);
let method2 = JSON.parse(JSON.stringify(obj));

console.log(method1); //Object.assign({}, obj)
/* result
{
  exec: function exec() {
    return true;
  },
  name: "scotch.io"
}
*/

console.log(method2); // JSON.parse(JSON.stringify(obj))
/* result
{
  name: "scotch.io"
}
*/

// -------------------------------- Method 3 : Using recursion -------------------------------//

function deepClone(obj){
  if(!obj) return obj //For undefined values

  const clone = {};
  for(const key in obj){
      const value = obj[key]

      if(typeof value !== 'object'){
        //Base case: Primitive elements inside object(map)
        clone[key] = value
      } else if(Array.isArray(value)) {
        //For array types we loop through the array to check for non-primitive type elements
        const copyArr = [];
        value.forEach(el => {
          if(typeof el !== 'object'){
            copyArr.push(el) //Base case: Primitive elements inside array
          } else {
            copyArr.push(deepClone(el)) //For non-primitive elements recurively call deepClone
          }
        })
        clone[key] = copyArr
      } else {
        //For other non-primitive we recurively call deepClone
        clone[key] = deepClone(value)
      }
  }

  return clone
}

// --------------------------- Test Object ------------------------ //

let originalObj = {
name: 'vaibhav',
phone: '98910066766',
occupation: {
  location: 'bangalore',
  role: 'enginner'
},
details: {
  face: {
    eyes: 'black',
    teeth: 'white'
  },
  middle: {
    dimensions: {
      waist: 60,
      chest: 60
    }
  }
},
languages: ['english', 'hindi', 'spanish', {
  subLanguages: ['abc', 'def', 'ghi']
}],
saySomething: function(){
  console.log('hello world')
}
}
let clonedObj = deepClone(originalObj)
console.log(clonedObj) // {...originalObj}

// --------------------------- Testcases ------------------------ //

//1) Testing nested level values
originalObj.name = 'aman'
originalObj.details.face.eyes = 'brown'
originalObj.occupation.role = 'senior enginner'

console.log(originalObj.name) //aman
console.log(originalObj.details.face.eyes) //brown
console.log(originalObj.occupation.role) //senior engineer
console.log(clonedObj.name) //vaibhav
console.log(clonedObj.details.face.eyes) //black
console.log(clonedObj.occupation.role) //engineer

//2) Testing array type values
originalObj.languages.push('german')

console.log(originalObj.languages) //['english', 'hindi', 'spanish', { subLanguages: [ 'abc', 'def', 'ghi', 'jkl' ] }, 'german']
console.log(clonedObj.languages) //['english', 'hindi', 'spanish', { subLanguages: [ 'abc', 'def', 'ghi', 'jkl' ] }]

//3) Testing objects inside array type values
originalObj.languages[3].subLanguages.push('jkl');

console.log(originalObj.languages[3].subLanguages) //[ 'abc', 'def', 'ghi', 'jkl' ]
console.log(clonedObj.languages[3].subLanguages) //[ 'abc', 'def', 'ghi']

//4) Testing function properties
originalObj.saySomething = function(){
console.log("hello old world")
}

originalObj.saySomething() //hello old world
clonedObj.saySomething() //hello world