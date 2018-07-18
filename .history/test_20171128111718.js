

setImmediate(()=>console.log('This will show in the near future'))

process.nextTick(()=>console.log('This will show in the near future'))

setTimeout(function() {
    console.log('This will show in the near future3')
}, 0);