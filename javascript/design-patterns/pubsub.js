//Pubsub is a common pattern used in JS event listerners, Redux etc.

class PubSub {
	constructor(){
    this.tracker = {}
  }
    
  subscribe(event, func){
    if(!this.tracker[event]){
        this.tracker[event] = []
      } 
    this.tracker[event].push(func)

    return {
      unsubscribe : () => {
        this.tracker[event] = this.tracker[event].filter(fn => fn !== func)
      }
    }
  }
  
  publish(event, ...args){
    const eventFuncs = this.tracker[event]
    if(Array.isArray(eventFuncs)){
      eventFuncs.forEach(func => {
        func(...args)
      })
    }
  }
}

let pubsub = new PubSub()

const addOne = (x) => {
	console.log("plusOne: ", x + 1)
}
const addThree = (x, y, z) => {
	console.log("addThree: ", x + y + z)
}

let foo = pubsub.subscribe("test", addOne)
let bar = pubsub.subscribe("test", addThree)

pubsub.publish("test", 1, 2, 3)

let foo1 = pubsub.subscribe("test2", addOne)
pubsub.publish("test2", 4)

foo.unsubscribe()
pubsub.publish("test", 1, 2, 3)
