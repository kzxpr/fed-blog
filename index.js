require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3011;

const AP_USERNAME = process.env.AP_USERNAME;
const AP_KEY = process.env.AP_KEY;

/* KNEX */
const { Tag, Account, Message } = require("./server/fed-plugin/models/db")
const db = require("./knexfile")
const knex = require("knex")(db)
var my_domain = "";

/* BODY PARSER */
var bodyParser = require('body-parser')
app.use(bodyParser.json({type: 'application/activity+json'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* FedPlugin */
const fed = require("./server/fed-plugin/index")({ domain: "domain" })

/* LOAD CONFIG */
async function loadConfig(){
    my_domain = await getConfigByKey("domain")
    app.set('domain', my_domain);
    fed.setDomain(my_domain)
}

loadConfig();

/* CORS */
const cors = require('cors')

/* PATH */
const path = require("path")

/* CLC */
const clc = require("cli-color");

/* PASS PROXY - TO GET IPs */
app.set('trust proxy',true); 

/* ALIVE TEST */
app.get("/alive", (req, res) => {
    console.log("TRIGGER")
    res.send("ALIVE!!")
})

/* LOAD CONFIG */
async function getConfigByKey(key){
    return await knex("config")
        .where("key", "=", key)
        .first()
        .select("value")
        .then((d) => {
            if(d){
                return d.value
            }else{
                console.log("ERROR finding key "+key+" in config")
                return;
            }
        })
        .catch((e) => {
            console.log("ERROR finding key "+key+" in config", e)
            return;
        })
}

/* ACTIVITY PUB */
const ap_webfinger = require("./server/fed-plugin/webfinger")
const ap_user = require("./server/fed-plugin/user")
const ap_admin_routes = require("./server/fed-plugin/admin")

app.use("/.well-known/webfinger/", cors(), ap_webfinger)
app.use("/u", cors(), ap_user)
app.use("/ap/admin", ap_admin_routes);

fed.eventHandler.on("follow:add", async function(follow_body){
    const from_uri = follow_body.actor;
    const to_uri = follow_body.object;
    console.log(clc.magenta("TRIGGER"), "Received FOLLOW from", from_uri, "to", to_uri)
    
    await Account.query()
        .whereNotNull("apikey")
        .andWhere("uri", "=", to_uri)
        .first()
        .then(async(row) => {
            if(row){
                await fed.sendAccept(row.username, row.apikey, from_uri, follow_body)
                .then((d) => {
                    console.log(clc.green("SUCCESS"), "accepted follow from", from_uri, "to", row.username)
                })
                .catch((e) => {
                    console.log(clc.red("ERROR"), "while sending accept message to", to_uri, e)
                })
            }else{
                console.log(clc.red("ERROR"), "no apikey found for", to_uri)
            }
        })
        .catch((e) => {
            console.log(clc.red("ERROR"), "while fetching APIkey for", to_uri, e)
        })
})

fed.eventHandler.on("create:add", async function(body){
    console.log(clc.magenta("TRIGGER create:add"), body.to)
})

/* STATICS */
app.use('/public', express.static(__dirname + '/public'));

/* HBS */
const exphbs  = require('express-handlebars');
const config = {
	extname: '.hbs',
    partialsDir: __dirname + '/views/partials/'
};
const hbs = exphbs.create(config);

/* FUNCS */
const { onlyUnique } = require("./funcs")

const funcs = require("./funcs")
for(let func in funcs){
    hbs.handlebars.registerHelper(func, funcs[func]);
}

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

/*********************/
/* LET THE FUN BEGIN */
/*********************/


async function getSiteInfo(){
    const sitetitle = await getConfigByKey("sitetitle");
    const sitesubtitle = await getConfigByKey("sitesubtitle")
    const user_url = await getConfigByKey("user_url")
    const { followers, following } = await Account.query()
        .where("handle", "=", user_url)
        .first()
        .withGraphFetched("[followers.^1,following.^1]")
        .then((result) => {
            return { ...result };
        })
        .catch((err) => {
            console.error("getSiteInfo: ", err)
        })
    return {
        sitetitle,
        sitesubtitle,
        my_url: user_url,
        footer: "This website is running on <a href='https://github.com/kzxpr/fed-blog' target='_new'>FED blog</a>. Download the repository and host your own!",
        links: [ { name: "FED blog code", url: "https://github.com/kzxpr/fed-blog" } ],
        followers, following
    }
    // "https://toot.community/users/openculture",
}

const { checkFeed } = require("./server/fed-plugin/lib/checkFeed");
const { sendAcceptMessage } = require("./server/fed-plugin/lib/sendAcceptMessage");

/*function getFollowed(){
    //return ["https://todon.eu/users/kzxpr", "https://todon.nl/users/NOISEBOB", "https://kolektiva.social/users/glaspest", "https://mastodon.social/users/NilsenMuseum"];//, "https://libranet.de/profile/kzxpr"]
}*/


app.get("/checkfeed", async(req, res) => {
    await checkFeed(["https://todon.eu/users/kzxpr", "https://todon.nl/users/NOISEBOB"]);
    res.send("DONE")
})

app.get('/profile/:username', async function (req, res) {
    let username = req.params.username;
    let domain = req.app.get('domain');
    if (!username) {
        res.status(404);
    } else {
        await Account.query().where("handle", "=", username+"@"+domain)
        .then(async(data) => {
            res.send("Welcome to "+username+"'s profile!")
        })
        .catch(async(err) => {
            res.status(err.statuscode).send("Error at /profile/"+username+": "+err.msg)
        })
    }
});

app.get("/feed", async (req, res) => {
    const siteinfo = await getSiteInfo();
    const messages = await Message.query()
        .whereNull("inReplyTo")
        .orderBy("publishedAt", "desc")
        .withGraphFetched("[creator.^1, addressees.^1, attachments.^1, tags.^1, replies.[creator,attachments], likes.sender.^1, announces.sender.^1]")
    //for(let m of messages){
        //console.log("FOUND ",m.addressees)
    //}
    
    res.render("feed", { ...siteinfo, messages });
})

app.post("/followme", async (req, res) => {
    const { your_instance } = req.body;
    const siteinfo = await getSiteInfo();
    
    if(!your_instance){
        const text = "Please specify an instance of Mastodoon (e.g. 'mastodon.social')";
        res.render("text", { ...siteinfo, text });
    }
    /*if (!(/^@[^@]+@[^\.]+\..+$/.test(your_instance))) {
        const text = "Your instance should be in the format @username@instance.social!";
        res.render("text", { ...siteinfo, text });
    }else*/
    if (your_instance.indexOf('/') === -1) {
        res.redirect("https://"+your_instance+"/authorize_interaction?uri="+encodeURIComponent(siteinfo.my_url))
    }else{
        const text = "Please enter your instance without https:// or other paths!";
        res.render("text", { ...siteinfo, text });
    }
})

app.get(["/what"], async (req, res) => {
    const siteinfo = await getSiteInfo();
    const text = "<h2>What?</h2>Read more about <a href='https://joinmastodon.org/' target='_new'>Mastodon</a>.<h2>How to follow this site?</h2>Once you have found an instance you trust, and have registered write the name of your instance above (like www.mastodon.social - without 'www') and press 'Follow' to be redirected.";
    res.render("text", { ...siteinfo, text });
})

app.get(["/", "/page", "/post", "/tag", "/page/:pageno", "/post/:postid", "/tag/:tagname", "/tag/:tagname/page/:pageno", "/tag/:tagname/post/:postid"], async (req, res) => {
    const user_uri = await getConfigByKey("user_url") || "";
    console.log("Using account with uri", user_uri)

    if(user_uri==""){
        throw new Error("No user_uri defined!")
    }

    var postid=null;
    var tagname=null;
    var pageno=0;
    var postprpage = 10;
    if(req.params.postid){
        postid = req.params.postid;
    }
    if(req.params.tagname){
        tagname = req.params.tagname;
    }
    if(req.params.pageno){
        pageno = req.params.pageno;
    }
    nextpage = parseInt(pageno) + 1;
    var pagetitle="";

    var posts;
    if(postid!==null){
        posts = await Message.query().where("guid", "=", postid)
            //.andWhere("public", "=", 1)
            .orderBy("createdAt", "desc")
            .withGraphFetched("[creator, attachments, tags, replies.creator, likes.sender, announces.sender, options]")
        if(posts[0]){
            if(posts[0].summary){
                pagetitle = posts[0].summary;
            }else if(posts[0].name){
                pagetitle = posts[0].name;
            }else{
                if(posts[0].content){
                    if(posts[0].content.length>100){
                        pagetitle = posts[0].content.substr(0, 97) + "...";
                    }else{
                        pagetitle = posts[0].content;
                    }
                }
            }
        }else{
            // 404
        }
        
    }else if(tagname!==null){
        posts = await Tag.query().where("name", "=", "#"+tagname).andWhere("type", "=", "Hashtag")
        
        .withGraphFetched("messages.[creator, attachments, tags, replies.creator, likes.sender, announces.sender, options]").first().then(async(tag) => {
            return tag.messages;
        })
    }else{
        posts = await Message.query().where("attributedTo", "=", user_uri)
        //.andWhere("public", "=", 1)
        .orderBy("publishedAt", "desc")
        .offset(pageno*postprpage).limit(postprpage)
        .withGraphFetched("[creator, attachments, tags, replies.creator, likes.sender, announces.sender, options]")
    }

    const account = await Account.query().where("uri", "=", user_uri).first()
        .withGraphFetched("[followers, following]")

    var hashtags = new Array();
    await Message.query().where("attributedTo", "=", user_uri)
        //.andWhere("public", "=", 1)
        .withGraphFetched("tags")
        .then((all_posts) => {
            for(let post of all_posts){
                for(let tag of post.tags){
                    if(tag.type == "Hashtag"){
                        var t = {};
                        t.name = tag.name.substr(1);
                        t.url_friendly = tag.name.substr(1).toLowerCase();
                        hashtags.push(t)
                    }
                }
            }
        })
    

    const tags = hashtags.filter(onlyUnique);

    const siteinfo = await getSiteInfo();

    res.render("blog",
        {
            ...siteinfo,
            pagetitle,
            account,
            tagname: tagname,
            tags,
            posts,
            nextpage
        })
});

app.listen(port, () => {
    console.log("Listen on the port "+port);
});