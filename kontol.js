const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const fs = require("fs");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");
function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Please Scan QR with app!`);
});
conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();
conn.on('message-new', async(m) =>{
    console.dir(m)
    const messageContent = m.message
    const text = m.message.extendedTextMessage !== null && !m.key.fromMe ? m.message.extendedTextMessage.text : m.message.conversation ;
    if (m.message.stickerMessage){
        const text = "Stiker"}
    const id = m.key.remoteJid
    try {
        var idg = conn.chats.get(m.key.remoteJid).name
        if (idg == undefined){
            var idg = (m.key.remoteJid).split("@s.whatsapp.net")[0]};
    if (m.key.fromMe) {
        var me = "Me"}
    else if (m.participant){
        var me = conn.chats.get(m.key.remoteJid)['presences'][m.participant]['name'] }
    else { var me = idg }
    } catch (error) {
        var idg = (m.key.remoteJid).split("@s.whatsapp.net")[0]};
    const messageType = Object.keys(messageContent)[0]
    let imageMessage = m.message.imageMessage;
    if (text.length > 0){
        console.log(`[${moment().format("HH:mm")}] ${idg}|${me} => ${text}`);}
    var menu = "Hello Sir This Is Menu Badworders Bot\n\n*!Menu* : Show Menu Bot\n\n*!mat3x3* : Matrix Ordo 3x3 (Determinan,Minor,Kofaktor,Adjoin)\nContoh Matrix A :\n| 1 2 3 |\n| 4 5 6 |\n| 7 8 9 |\nCommand : !mat3x3 1 2 3 4 5 6 7 8 9 \n\n*!basic* : Kalkultor \n* = kali\n *:* = bagi\n*+* = tambah \n*-* = kurang\n** = pangkat"
    var command = text.toLowerCase();
    if (command[0] == "!"){
        if (command == "!menu"){
            conn.sendMessage(id,menu,MessageType.text,{ quoted: m })
        }
        else if (command.includes('!mat3x3')){
            var x = command.split(" ")
            const { execFile } = require("child_process");
            const ls = execFile("python", ["matrix3x3.py",x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9]]);
            ls.stdout.on("data", data => {
                conn.sendMessage(id,data,MessageType.text,{ quoted: m })
            })
        }
        else if (command.includes('!basic')){
            var x = command.split(" ")
            const { execFile } = require("child_process");
            const ls = execFile("python", ["mtkbasic.py", x[1]])
            ls.stdout.on("data", data => {
                conn.sendMessage(id,data,MessageType.text,{ quoted: m })
            })
        }
        else if (command.includes('!python')){
            if (m.participant == '6285774148323@s.whatsapp.net' || m.key.remoteJid == '6285774148323@s.whatsapp.net' ) {
                if (command == "!python"){
                    conn.sendMessage(id,"Input Code",MessageType.text,{ quoted: m })
                }
                var x = text.split("!python\n")[1]
                if (x.length > 0){
                const { execFile } = require("child_process");
                const ls = execFile("python", ["shel.py",x])
                ls.stdout.on("data", data => {
                    if (data != "\n"){
                        conn.sendMessage(id,data,MessageType.text,{ quoted: m })
                    }
                })
                ls.stderr.on("data", data => {
                    if (data.includes("scriptshell.py")){
                        conn.sendMessage(id,"_Error Code_ : "+data.split('scriptshell.py", ')[1],MessageType.text,{ quoted: m })
                        }
                })
            }
            }
            else {
                conn.sendMessage(id,"Hehey Not Bad",MessageType.text,{ quoted: m })
            }
        }
        else if (command.includes('!xhp')){
            var x = command.split(" ")
            const { execFile } = require('child_process');
            const ls = execFile('python', ['xnxxphotos.py', x[1]])
            var processResult = function(stdout) {
                  var result = stdout.replace("[","").replace("]\n","").replace(/'/g,"").split(", ")
                  function log(i) {
                      console.log(result[i]);
                      var buf =  fs.readFileSync(result[i])
                      conn.sendMessage(id,buf,MessageType.image,{quoted:m})
                      if (i < result.length-1) {
                      setTimeout(function() {
                         i++;
                         log(i);
                         }, 1000);
                     }
                 }
                 log(0);
            };
            ls.stdout.on('data', (data) => {
                 processResult(data)
            })
         }
    }
    else {
        const { execFile } = require("child_process");
        const ls = execFile("python", ["badword.py",command])
        ls.stdout.on("data", data => {
            console.log(data)
            conn.sendMessage(id,data,MessageType.text,{ quoted: m })
        })
    }
})