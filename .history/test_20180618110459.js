console.time('starting');
const a = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});

const b = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject();
    }, 100);
});

 Promise.all([a , b]).then((result) =>{
    console.log(result);
})
