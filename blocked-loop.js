const blocked = require('blocked-at');

const greedyFunction = () =>{
    const end = Date.now() + 2000;
            while (Date.now() < end) {
            eval("1+2+3");
        } 
    console.log(`Ending a greedy function`);
}

const handleBlockedLoop = (time, stack) => {
    console.log(`Blocked at ${stack} for ${time} ms`);
    //TODO: export to Promotheus here
}

const {stop} = blocked(handleBlockedLoop, {});
setImmediate(greedyFunction);
console.log(`Program finished`);