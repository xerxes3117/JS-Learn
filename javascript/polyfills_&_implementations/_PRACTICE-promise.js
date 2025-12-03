class myPromise {

	resolve(){}

	reject(){}

	/**
	 * - Accepts a callback
	 * - Callback should receive resolved or rejected data as argument
	 * - Whatever is returned from 'then' callback should again be returned as a new promise
	 */
	then(){}

	/**
	 * - This will catch error from any then block in chain above it
	 */
	catch(){}
}

//Testcases

//Example 1: Synchronous resolve
const promise1 = new myPromise(function (resolve, reject) {
  resolve("hello");
});

promise1.then((res) => console.log("Example 1: final value: ", res)); // hello

//Example 2: Synchronous reject (no chaining)
const promise2 = new myPromise(function (resolve, reject) {
  reject("some error occured");
});

promise2.catch((err) => console.log("Example 2: error: ", err)); // some error occurred

// //Example 3: Asynchronous resolve
const promise3 = new myPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve("hello");
  }, 3000);
});

promise3.then((res) => console.log("Example 3: final value: ", res)); // hello

// //Example 4: Asynchronous reject (no chaining)
const promise4 = new myPromise(function (resolve, reject) {
  setTimeout(function () {
    reject("error occured");
  }, 3000);
});

promise4.catch((err) => console.log("Example 4: error: ", err)); // error occured

//Example 5: Chained promise
let promise5 = new myPromise((resolve, reject) => {
  //executer
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise5.then(res => res * 2)
        .then(res => res * 3)
        .then(res => console.log("Example 5: final value: ", res)); // 120

//Example 6: Chained promise
let promise6 = new myPromise((resolve, reject) => {
  //executer
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise6.then(res => console.log("Example 6: initial value: ", res)) // 20
        .then(res => res * 2)
        .then(res => console.log("Example 6: final value: ", res)); // NaN

//Example 7: Rejected promise with catch chaining
let promise7 = new myPromise((resolve, reject) => {
  //executer
  setTimeout(() => {
    reject("some error occurred");
  }, 3000);
});

promise7
  .then((res) => res * 2)
  .then(console.log)
  .catch((err) => console.log("Example 7: error: ", err)); // some error occurred

//Example 8: Rejected promise with catch chaining
let promise8 = new myPromise((resolve, reject) => {
  //executer
  setTimeout(() => {
    reject("hello");
  }, 3000);
});

// NO OUTPUT!!
promise8
  .then((res) => res * 2)
  .then(console.log)
  .catch(() => "promise rejected with error")
  .catch(console.log);
