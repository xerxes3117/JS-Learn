//@todo:
// 1) implement the object approach with a unique index for each function (see comment below)

class MyEventEmitter {
  constructor() {
    this.tracker = {};
  }

  on(callbackFn) {
    if (typeof callbackFn === "function") {
      this.tracker[callbackFn] = callbackFn; //This will fail if 2 function name and bodies are same
    } else {
      throw new Error("The passed value is not a function");
    }

    return {
      unsubscribe: () => {
        delete this.tracker[callbackFn];
      }
    };
  }

  emit(...args) {
    for (const key in this.tracker) {
      this.tracker[key](...args);
    }
  }
}

//Testcases
const ev = new MyEventEmitter();

const sub1 = ev.on((msg) => {
  console.log("Sub1 -> ", msg);
});

const sub2 = ev.on((msg) => {
  console.log("Sub2 -> ", msg);
});

ev.emit("First time emit");
/* Expected Output
 * Sub1 -> First time emit
 * Sub2 -> First time emit
 */

sub1.unsubscribe();

ev.emit("Second time emit");
/* Expected Output
 * Sub2 -> Second time emit
 */

const sub3 = ev.on((msg1, msg2) => {
  console.log("Sub 3 ->", msg1, msg2);
});

ev.emit("emit1", "emit2");
/* Expected Output
 * Sub 2 -> emit1
 * Sub 3  -> emit1, emit2
 */
