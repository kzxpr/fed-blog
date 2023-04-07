const { EventEmitter } = require("events")

class MyClass{
    constructor(name) {
        this.name = name;
        this.eventHandler = new EventEmitter();
    }

    myName(){
        console.log("Hi, my name is "+this.name)
        this.eventHandler.emit("test")
        return this.name;
    }
}

module.exports = MyClass;