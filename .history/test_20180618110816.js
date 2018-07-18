console.time('starting');
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
    console.timeEnd('starting');
}).catch((error) => {

});
