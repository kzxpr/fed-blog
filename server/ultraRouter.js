const express = require('express'),
    router = express.Router();

const db = require("./../knexfile")

//const ActivityHub = require("./fed-plugin/ultraClass")
const ap_config = require("./ap-config.json")
//const hub = new ActivityHub({ db, ...ap_config })
const hub = require("./fed-plugin/ultraClass")({ db, ...ap_config })

const { Message } = hub;

router.get("/test", async function(req, res){
    res.send("ROUTE "+hub.showDomain("sjov"))
})

router.get("/make", function(req, res){
    res.send(hub.writeMessage("My msg"))
})

router.get("/latest", async function(req, res){
    await Message.query().first()
    .then((m) => {
        res.send(m)
    })
    .catch((e) => {
        res.send(e)
    })
})

router.get("/messages", async function(req, res){
    //await Message.query().orderBy("content", "asc")
    await hub.getMessages()
    .then((m) => {
        res.send(m)
    })
    .catch((e) => {
        res.send(e)
    })
})

module.exports = router;