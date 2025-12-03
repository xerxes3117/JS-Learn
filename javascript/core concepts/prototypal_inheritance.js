function Ninja(bool){
  this.isNinja = bool
}

console.log("Ninja prototype", Ninja.prototype) //this object is used to create objects when Ninja called as constructor 
console.log("Ninja __proto__", Ninja.__proto__) //this is for prototype chaning of Ninja function itself

let ninja1 = new Ninja(false)

Ninja.prototype.func1 = function(){
  console.log("calling func1")
  console.log(this) 
}

Function.prototype.func3 = function(){
  console.log(this) //Ninja Function
}

Ninja.func3()

Ninja.prototype = {
  func2: function(){
      console.log("calling func2")
      console.log(this)
  }
}

let ninja2 = new Ninja(true)
debugger
ninja1.func1()
ninja2.func2()
ninja1.func2() //won't work
ninja2.func1() //won't work