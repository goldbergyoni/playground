const EventEmitter = require('events').EventEmitter;


async function* pagesGenerator(n, to) {
    yield await fetchPage(n);
    if (to === n) return;
    yield* pagesGenerator(n + 1, to);
}

async function pagesEmitter(n, to) {
    const thePagesEmitter = new EventEmitter();
    setTimeout(async () => {
        for (let index = n; index < to; index++) {
            thePagesEmitter.emit("pageFetched" , await fetchPage(n));
        }
    }, 100);
    return thePagesEmitter;
}

async function fetchPage(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("ipsem lorem");
        }, Math.ceil(Math.random() * 3));
    });
}

//option 1 - using async generator
async function printAllBookPagesWithGenerator() {
    for await (const p of pagesGenerator(0, 10)) console.log(p)
}

//option 2 - using event emitter
async function printAllBookPagesWithEventEmitter() {
    pagesEmitter().on("pageFetched" , (p) => {console.log(p)})
}


printAllBookPagesWithEventEmitter();