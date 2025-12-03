//---------------------------------- Enumerability and ownership of properties -----------------------------------------//
//Resources:
// 1) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
// 2) https://stackoverflow.com/questions/58439130/is-there-any-difference-between-enumerable-and-own-properties
// 3) https://2ality.com/2011/07/js-properties.html 

//Defining common property on all instances of a native class
obj = {a: 1, b: 2, c: 3, d: 4}

Object.prototype.test1 = 12

obj.test1 //prints 12

for(const key in obj) {
  console.log(key) 
} //prints a,b,c,d,test1


//Defining non-enumerable common property on all instances of a native class
Object.defineProperty(Object.prototype, 'test2', {
  value: 2, 
  enumerable: false //No need to mention this explicitly also as this is false by default for any property defined using Object.defineProperty
})

//Note that test2 is not looped over as they are defined as non-enumerable
for(const key in obj) {
  console.log(key) 
} //prints a,b,c,d,test1