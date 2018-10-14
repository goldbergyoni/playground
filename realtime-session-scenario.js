const EventEmitter = require("events");

class Session extends EventEmitter {
    constructor(id) {
        super();
        this.id = id;
    }

    start() {
        console.log(`Session is about to start ${this.id}`);
        const howLongToRun = Math.ceil(Math.random()*5);
        console.log(howLongToRun);
        setTimeout(() => {
            this.emit("end", this.id);
        }, howLongToRun*1000);
    }
}

class Scheduler {
    start() {
        [1, 2, 3].forEach((item) => {
            const session = new Session(item);
            session.on('end', (id) => {
                console.log(`Scheduler was notified that session has finished ${id}`);
            });
            session.start();
            console.log(`Scheduler just started session ${item}`)
        })
    }
}

new Scheduler().start();