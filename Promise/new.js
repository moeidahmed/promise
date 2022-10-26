function myPromise(executor) {
  this.then = function (myFun) {
    onResolve = myFun;
    return this;
  };
  this.catch = function (myFun) {
    onReject = myFun;
    return this;
  };
  function resolve(v) {
    onResolve(v);
  }
  function reject(v) {
    onReject(v);
  }
  executor(resolve, reject);
}

//Code testing
setTimeout(() => {
  const data = fetch("promise.json");
  console.log(data);
  function result(n) {
    return new myPromise((resolve, reject) =>
      setTimeout(() => {
        if (n > 5) {
          resolve("Resolve");
        } else {
          reject("Error");
        }
      }, 2000)
    );
  }
  let num = Math.trunc(Math.random() * 10);
  result(num)
    .then((res) => console.log(res))
    .catch((rej) => console.log(rej));
}, 1000);
