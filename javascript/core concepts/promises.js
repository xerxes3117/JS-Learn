// ----- Promise vs Pub Sub ----- //
let promise = new Promise((resolve, reject) => resolve("done"), 3000)

//Note below that promise object is never consumed
//It is just set to "settled" state and that state can be accessed as many times as we want
promise.then(d => console.log(d)) //prints "done"
promise.then(d => console.log(d)) //prints "done"
promise.then(d => console.log(d)) //prints "done"


// ----- Promise can only have one state after settlement ----- // 
//All further resolve or reject calls are ignored
let promise2 = new Promise((resolve, reject) => {
	resolve("done promise 2")
  reject(new Error("Something bad happened!!!")) //ignored
  resolve("done again!!") //ignored
})
promise2.then(d => console.log(d), e => console.log(e)) //error or done again are never captured