// // 1. 创建一个新的promise对象
// const p = new Promise((resolve, reject) => { // 执行器函数先执行 -- 同步回调
//     console.log('执行器函数 excutor 先执行');
//     // 异步任务启动但是未完成而已
//     // 2. 执行异步操作任务setTimeout
//     const time = Date.now(); // 如果当前时间是偶数就代表成功，否则代表失败
//     // 3.1.如果成功了,调用 resolve(value)
//     if (time %2 == 0) {
//       resolve ('成功的数据, time=' + time);
//     } else {
//       // 3.2.如果失败了,调用reject(reason)
//       reject('失败的数据，time=' + time);
//     }
// })
// console.log('new Promise()之后');
// // 结果: 执行器函数 excutor 先执行 -> new Promise()之后 -> setTimeout结果(成功的回调 成功的数据, time=...)
// setTimeout(()=>{
//   p.then(value=>{ // 接收得到成功的 value 数据onResolved
//     console.log('成功的回调', value);
//   }, reason =>{// 接收得到失败的reason数据 onRejected
//     console.log('失败的回调', reason);
//   } // 接收得到失败的reason数据
// )
// }, 2000);

new Promise((resolve, reject) => { // excutor执行器函数
  setTimeout(() => {
    if(1>0) {
      resolve('成功的数据') // resolve()函数
    } else { 
      reject('失败的数据') //reject()函数
     }
  }, 1000)
}).then(
 value => { // onResolved() 函数
  console.log(value)
}
).catch(
 reason => { // onRejected() 函数
  console.log(reason)
}
)