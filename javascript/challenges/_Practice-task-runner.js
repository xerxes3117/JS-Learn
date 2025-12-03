/**
* TaskRunner
* - Perform tasks sequentially. Further features:
*   1. retries
*   2. timeouts
*   3. concurrency
*/
// See: 
// - https://stackoverflow.com/questions/51850236/javascript-scheduler-implementation-using-promises 
// - https://codesandbox.io/s/1qsky
// - https://jh3y.medium.com/how-to-build-your-own-task-runner-with-es6-and-node-85d871a4a0c
// - https://docs.prefect.io/api-ref/prefect/task-runners/#prefect.task_runners.SequentialTaskRunner

class TaskRunner {
  constructor(){
    this.taskQueue = [];
  }

  enqueue(task, cb) {
    const taskPromise = new Promise(task)
    taskPromise.then(res => cb({data: res})).catch(err => cb({error: err}))

    this.taskQueue.push(taskPromise);
  }
}

const runner = new TaskRunner()

const task1 = (complete, fail) => setTimeout(() => complete('first task completed'), 1000)
const task2 = (complete, fail) => setTimeout(() => fail('second task failed'), 3000)

const callback = ({ data, error }) => console.log({ data, error })

runner.enqueue(task1, callback)
runner.enqueue(task2, callback)