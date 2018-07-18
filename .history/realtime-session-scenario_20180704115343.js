const EventEmitter = require("events");

class Scenario extends EventEmitter {
    constructor() {
        super();
    }

    start() {
        console.log(`Scnario is about to start`);
        setTimeout(() => {
            this.emit("end", {});
        }, 2000);
    }
}

class Session extends EventEmitter {
    constructor(id) {
        this.id = id;
        super();
    }

    start() {
        console.log(`Session is about to start ${id}`);
        setTimeout(() => {
            this.emit("end", {});
        }, 2000);
    }
}

class Scheduler {
    start() {
        [1, 2, 3].forEach((item) => {
            const session = new Session(item);
            session.on('end', () => {
                console.log(`Scheduler was notified that session has finished`);
            });
            session.start();
        })
    }
}