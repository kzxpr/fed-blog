const MyClass = require("./myClass")

const instance = new MyClass("Cornelius")

instance.eventHandler.on("test", () => {
    console.log("Dette sker!")
})

instance.myName();