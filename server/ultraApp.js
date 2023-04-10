const express = require('express')
const app = express()
const port = 3000;

const db = require("./../knexfile")

//const ActivityHub = require("./fed-plugin/ultraClass")
const ap_config = require("./ap-config.json")
//const hub = new ActivityHub({ db, ...ap_config })
const hub = require("./fed-plugin/ultraClass")({ db, ...ap_config })

hub.setRoutes(app);

const { Account } = hub;
// const { writeMessage, showDomain } = hub; // can't be used

//console.log("Added AP to https://"+hub.getDomain())

hub.eventHandler.on("showAccounts", () => {
    console.log("Route trigger: Showing accounts!")
})

hub.eventHandler.on("getMessages", () => {
    console.log("We're getting messages!")
})

async function test(){
    //const accounts = await hub.getAccounts();
    //console.log(accounts)

    //console.log(hub.writeMessage("Hello world!"))
}

app.get("/whereami", (req, res) => {
    // res.send(showDomain("lol")) // WONT work!
    res.send(hub.showDomain("lol"));
})

app.get("/me", async(req, res) => {
    const user = await Account.query().where("id", "=", 6).first()
    .then((d) => {
        res.send(d.username)
    })
    .catch((e) => {
        res.send(e)
    })
})

app.get("/messages", async function(req, res){
    //await Message.query().orderBy("content", "asc")
    await hub.getMessages()
    .then((m) => {
        res.send(m)
    })
    .catch((e) => {
        res.send(e)
    })
})

app.use("/extra", require("./ultraRouter"))

app.get("/", (req, res) => {
    res.send("Works!")
})

app.listen(3000,  function(){
    console.log(`Server listening on port ${port}.`)
});