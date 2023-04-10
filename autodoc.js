const fs = require('fs');
const clc = require("cli-color");

async function document(path, file){
    return new Promise(async(resolve, reject) => {
        return fs.readFile(path+file, 'utf-8', (err, allFileContents) => {
            //console.log(file)
            var body = file+"\n";
            allFileContents.split(/\r?\n/).forEach(line => {
                if(line.search(/^(\s*)(async(\s*)|)function(\s*)/)>-1){
                    let l = line.trim();
                    //console.log("- "+l.substr(0, l.length-1))
                    body += "- "+l+"\n";
                }
            });
            //console.log(" ")
            resolve(body);
        });
    })
}

async function scan(folder){
    return new Promise(async(resolve, reject) => {
        fs.readdir(folder, async(err, files) => {
            var body = "HER";
            files.forEach(async(file) => {
                //console.log(file)
                let str = document(folder, file).then((str) => {
                    //console.log("STR", str)
                    body += str;
                })
                //console.log("----------------")
                //console.log(str)
                //console.log(body)
            });
            resolve(body)
        });
    })
}

async function main(){
    console.log(await scan("./server/fed-plugin/lib/"))
}

main()