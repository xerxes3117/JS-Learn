function deepClone(obj){
    if(!obj) return obj

    const clone = {};

    for(const key in obj){
        const value = obj[key]

        if(typeof value !== 'object'){
          clone[key] = value
        } else if(Array.isArray(value)) {
          const copyArr = [];
          value.forEach(el => {
            if(typeof el !== 'object'){
              copyArr.push(el)
            } else {
              copyArr.push(deepClone(el))
            }
          })
          clone[key] = copyArr
        } else {
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