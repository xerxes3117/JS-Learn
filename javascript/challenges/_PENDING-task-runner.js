//LEVEL: HARD

/**
* TaskRunner
* - Perform tasks sequentially. Further features:
*   1. retries
*   2. timeouts
*   3. concurrency
*/
// Solutions: 
// - https://stackoverflow.com/questions/51850236/javascript-scheduler-implementation-using-promises 
// - Somewhat similar: https://github.com/sadanandpai/javascript-code-challenges/blob/main/challenges/async-challenges.md#q-execute-an-array-of-asynchronous-functions-one-after-the-other-in-sequence-using-callbacks

class TaskRunner {

  constructor() {
    this.taskQueue = []

    this.startTaskExecution()
    this.isBusy = false
  }


  enqueue(task, callback) {
    this.taskQueue.push({
      taskFunc: task,
      taskCb: callback
    })
  }


  startTaskExecution() {
    setInterval(() => {
      if (this.taskQueue.length > 0 && !this.isBusy) {
        this.isBusy = true
        let priorityTask = this.taskQueue.pop()
        let taskPromise = new Promise(priorityTask.taskFunc)

        taskPromise.then((data) => {
          priorityTask.taskCb({ data, undefined })
          this.isBusy = false
        })
        .catch((error) => {
          priorityTask.taskCb({ undefined, error })
          this.isBusy = false
        })
      }
    })
  }
}

const runner = new TaskRunner()

const task1 = (complete, fail) => setTimeout(() => complete('first task completed'), 1000)
const task2 = (complete, fail) => setTimeout(() => fail('second task failed'), 3000)

const callback = ({ data, error }) => console.log({ data, error })

runner.enqueue(task1, callback)
runner.enqueue(task2, callback)