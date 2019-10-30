var fs = require('fs');
const prom = require('util').promisify(fs.appendFile);

(async () => {
    console.time('foo');
    console.log('starting');
    //const dirName = "/Volumes/ramdisc2/"
    const dirName = "/users/yonigoldberg/temp/"
    for (let index = 0; index < 3000; index++) {
        const fileName = `${dirName}mynewfile${index}.txt`;
        await prom(fileName, `Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd
        Hello content! fdsfsd fsd fdsf sd fsdf sdfsfd`);
        if(index===500){
            console.log(500);
        }
    }
    console.log('ending');
    console.timeEnd('foo');

})();