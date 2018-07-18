const EventEmitter = require("events");

class Scenario extends EventEmitter {
  constructor() {
    super();
    se
  }

  start(){
    console.log(`One time schedule is about to emit start event`);
    this.emit("start", {});
  }
}

module.exports = ImmediateSchedule;