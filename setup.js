const readlineSync = require("readline-sync")
const fs = require("fs")

function testDBConnection(connection){
    console.log(connection)
    return new Promise(async(resolve, reject) => {
        const conn = require('knex')({
            client: 'mysql',
            connection,
            useNullAsDefault: true
        });
        
        conn.raw("SELECT 1").then(() => {
            resolve("OK")
        })
        .catch((e) => {
            reject(e)
        });
    });
}

async function main(){
    console.log("Thanks for choosing fed-blog. I'm going to help you configure the blog with your MySQL-database and domain.")

    if(fs.existsSync(".envo")){
        console.log("ENV is here")
    }else{
        console.log("NO env")
    }

    var db_check = false;
    var db_host, db_user, db_pass, db_port, db_base;

    while(!db_check){
        db_host = readlineSync.question("MySQL hostname (default 'localhost'): ", { defaultInput: "localhost" });
        db_user = readlineSync.question("MySQL username (default 'root'): ", { defaultInput: "localhost" });
        db_pass = readlineSync.question("MySQL password: ", { hideEchoBack: true });
        db_port = readlineSync.questionInt("MySQL port (default 3306): ", { defaultInput: 3306 });
        db_base = readlineSync.question("MySQL database (default 'fedblog'): ", { defaultInput: "fedblog" });

        await testDBConnection({ host: db_host, port: db_port, user: db_user, password: db_pass, database: db_base})
            .then((d) => {
                console.log("PERFECT!")
                db_check=true;
            })
            .catch((e) => {
                console.error("Error connecting to DB:", e.sqlMessage)
                console.log("Try again....")
            })
    }

    // EXAMPLE OF EMBEDDED MIGRATIONS: https://spin.atomicobject.com/2018/01/06/database-migration-aws-lambda/

    process.exit(0)
}

main();