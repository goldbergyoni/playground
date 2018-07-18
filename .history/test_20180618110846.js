console.time('time');
const a = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 3000);
});

const b = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("failure");
    }, 100);
});

 Promise.all([a , b]).then((result) =>{
     console.log('Finished');
    console.log(result);
    console.timeEnd('time');
}).catch((error) => {
    console.log('Finished with error');
    console.log(error);
    console.timeEnd('time');
});
