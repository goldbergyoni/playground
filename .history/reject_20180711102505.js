return new Promise((resolve, reject) => {
    reject("Boo");
    console.log("So I threw an error so this line will never run, right?")
});