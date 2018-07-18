const a = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});