const EventEmitter = require("events");

class Scenario extends EventEmitter {
  constructor(properties) {
    super();
  }

  start(){
    console.log(`One time schedule is about to emit start event`);
    this.emit("start", {});
  }
}

module.exports = ImmediateSchedule;