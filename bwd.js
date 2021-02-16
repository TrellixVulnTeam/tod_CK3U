var qrcode = require("qrcode-terminal");
var moment = require("moment");
var jam = moment().format("HH:mm");
var cheerio = require("cheerio");
var fs = require("fs");
var a = require("child_process");
var { execFile } = require("child_process");
var fetch = require('node-fetch');
var urlencode = require("urlencode");
var axios = require("axios");
var imageToBase64 = require('image-to-base64');
var
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
var path = require('path');
var express = require('express');
var http = require('http');

var app = express();
var server = http.Server(app);
var port = process.env.PORT || 1337 ;

//app.get('/', function(req, res) {    res.sendFile(path.join(__dirname + '/index.html'));});
//server.listen(port, () => {  console.log(`Listening on http:localhost:${port}/`);});
var conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Please Scan QR with app!`);
});
conn.on('credentials-updated', () => {
   console.log(`credentials updated!`)
   var authInfo = conn.base64EncodedAuthInfo()
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))  
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
conn.connect();
function sectomin(duration){
  let min = parseInt(duration / 60);
  duration = duration % (60);
 
  let sec = parseInt(duration);
 
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  if (min == 0) {
    return `${sec}s`
  }
  else {
    return `${min}m ${sec}s`
  }
}
function minusfind(mem,room,id){
    idx = Object.keys(mem).length
    var tester = [].sort()
    for (let i = idx; i > 0 ; i--) if (!mem[i-1].key.fromMe){tester.push(mem[i-1].messageTimestamp.low || mem[i-1].messageTimestamp)}
    var newA = [];
    for (let i = 1; i > 0 ; i--)  newA.push(tester[i-1] - tester[i])
    var spam = newA.filter(function(x){ return x < 2 ; }).length;
    if (spam){
        conn.sendMessage(id,"Cukup Sekali Saja Sobat Min`Sky :)",MessageType.text)
    }
    else{
         for (let index=idx;  index > 0 ;index--) {
            m = mem[index-1]
            if (m.message){
                var messageContent = m.message
                var messageType = Object.keys(messageContent)[0]
                if (messageType === MessageType.text || messageType === MessageType.extendedText) {
                    var spit = m.message.conversation || m.message.extendedTextMessage.text
                    if (spit.includes("Memutuskan Hubungan, Ketik _*!find*_ Untuk Mencari Teman") && mem[index-1].key.fromMe || spit.includes("Teman Ditemukan , Bersikaplah Baik!") && mem[index-1].key.fromMe){
                        var asu = index-1
                        break                    
                    }
                    else if (spit == "Mencari Teman ..." && mem[index-1].key.fromMe){
                        var ttl = mem[index-1].messageTimestamp.low ||mem[index-1].messageTimestamp
                        var last = new Date(ttl*1000).getMinutes()*60 + new Date(ttl*1000).getSeconds()
                        var ttg = mem[idx-1].messageTimestamp.low
                        var gsabar = new Date(ttg*1000).getMinutes()*60 + new Date(ttg*1000).getSeconds()
                        var limit = gsabar - last
                        if (limit < 0){
                            var limit = limit*-1
                        }
                        if (limit < 61 ){
                            conn.sendMessage(id,"Sabar, Bot Sedang Mencari Teman ...\nSisa Waktu Pencarian "+sectomin(60 - limit),MessageType.text)
                            break
                        }
                        else {
                            find(room,id)
                            break
                        }
                    }
                    else if (spit != "Teman Ditemukan , Bersikaplah Baik!" && mem[index-1].key.fromMe && index-1 == 0 || spit != ("Mencari Teman ...") && mem[index-1].key.fromMe && index-1 == 0 || !spit.includes("Memutuskan Hubungan, Ketik _*!find*_ Untuk Mencari Teman") && mem[index-1].key.fromMe && index-1 == 0 ){
                        find(room,id)
                        break
                    }
                }
            }
            else if (index-1 == 0){
                find(room,id)
                break
            }
        }
        if(asu){
            for (let ind=idx;  ind > asu ;ind--) {
                var mm = mem[ind-1]
                if (mm.message){
                    var mmessageContent = mm.message
                    var mmessageType = Object.keys(mmessageContent)[0]
                    if (mmessageType === MessageType.text || mmessageType === MessageType.extendedText) {
                        var ext = mm.message.conversation || mm.message.extendedTextMessage.text
                        if (ext == "Mencari Teman ..." && mem[ind-1].key.fromMe){
                            var ttl = mem[ind-1].messageTimestamp.low ||mem[ind-1].messageTimestamp
                            var last = new Date(ttl*1000).getMinutes()*60 + new Date(ttl*1000).getSeconds()
                            var ttg = mem[idx-1].messageTimestamp.low
                            var gsabar = new Date(ttg*1000).getMinutes()*60 + new Date(ttg*1000).getSeconds()
                            var limit = gsabar - last
                            if (limit < 0){
                                var limit = limit*-1
                            }
                            if (limit < 61 ){
                                conn.sendMessage(id,"Sabar, Bot Sedang Mencari Teman ...\nSisa Waktu Pencarian "+sectomin(60 - limit),MessageType.text)
                                break
                            }
                            else {
                                find(room,id)
                                break
                            }
                        }
                        else if (ext != ("Mencari Teman ...") && mem[ind-1].key.fromMe && ind-1 == asu){
                            find(room,id)
                            break
                        }
                    }
                }
                else if (ind-1 == asu){
                    find(room,id)
                    break
                }
            }
        }
    }
}
async function teman(id,data){
    var nama = conn.contacts[data].notify
    var { execFile } = require("child_process");
    var namaa = conn.contacts[id].notify
    conn.sendMessage(data,"Teman Ditemukan , Bersikaplah Baik!", MessageType.text)
    conn.sendMessage(id,"Teman Ditemukan , Bersikaplah Baik!", MessageType.text)
    try{
        var ppUrl = await conn.getProfilePicture(data)
        var ls = execFile("curl", ["-o",data+".jpg",ppUrl])
        ls.on('exit',() => {
            var img = fs.readFileSync(data+".jpg")
            let MessageOptions = {mimetype: Mimetype.image, caption: `Nama : ${nama}`}
            conn.sendMessage(id,img,MessageType.image,MessageOptions)
            fs.unlinkSync(data+".jpg")
        })
    }
    catch {
        conn.sendMessage(id,"Nama : "+nama, MessageType.text)
        
    }
    try{
        var pp = await conn.getProfilePicture(id)
        var ld = execFile("curl", ["-o",id+".jpg",pp])
        ld.on('exit',() => {
            var imgg = fs.readFileSync(id+".jpg")
            let MessageOptions = {mimetype: Mimetype.image, caption: `Nama : ${namaa}`}
            conn.sendMessage(data,imgg,MessageType.image,MessageOptions)
            fs.unlinkSync(id+".jpg")
        })
    }
    catch {
        conn.sendMessage(data,"Nama : "+namaa, MessageType.text)
    }
}
function find(room,id){
    if (room.includes(id)){
        conn.sendMessage(id,"Kamu Sedang Terhubung Dengan Teman Ketik _*!end*_ Untuk Memutuskan Hubungan Dengan Teman",MessageType.text)
    }
    else {
        conn.sendMessage(id,"Mencari Teman ...",MessageType.text) 
        var ls = execFile("python", ["find.py",id])
        ls.stdout.on("data",data => {
            text = data.replace("\n","")
            if (text.includes("@")){
                teman(id,text)
            }
            else {
                conn.sendMessage(id,text,MessageType.text)
            }
        })
    }
}
async function gas(m){
    var id = m.key.remoteJid
    var room = fs.readFileSync('room.txt','utf8')
    var idg = conn.contacts[id].notify
    var messageContent = m.message
    var messageType = Object.keys(messageContent)[0]
    if (messageType === MessageType.text || messageType === MessageType.extendedText) {
        var text = m.message.conversation || m.message.extendedTextMessage.text
        var type = MessageType.text
        if (text.includes("!")){
            var a = require("child_process");
            await a.execSync("python gas.py")
            if (text == "!help"){
                var help = "Ketik _*!find*_ Untuk Mencari Teman\nKetik _*!end*_ Untuk Meninggalkan Teman\nReport : wa.me/6285774148323"
                conn.sendMessage(id,help,MessageType.text,{ quoted: m })
            }
            else if(text.includes('!find')){
                var n = await conn.loadMessages(id,1000)
                var mem = n.messages
                minusfind(mem,room,id)
            }
            else if(text.includes('!end')){
                if (room.includes(id)){
                    var a = require("child_process");
                    var ls = a.execSync("python regek.py "+id)
                    var snder = ls.toString().replace("\n","")
                    conn.sendMessage(id,"Kamu Memutuskan Hubungan, Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
                    conn.sendMessage(snder,"Teman Memutuskan Hubungan, Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
                    fs.readFile('room.txt', {encoding: 'utf-8'}, function(err, data) {
                        if (err) throw error;
                        let dataArray = data.split('\n')
                        var searchKeyword = id
                        let lastIndex = -1
                        for (let index=0; index<dataArray.length; index++) {
                            if (dataArray[index].includes(searchKeyword)) {
                                lastIndex = index
                                break; 
                            }
                        }
                        dataArray.splice(lastIndex, 1);
                        var updatedData = dataArray.join('\n');
                        fs.writeFile('room.txt', updatedData, (err) => {
                            if (err) throw err;
                        });
                    });
                }
                else {
                    conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
                }
            }
            else if(text.includes('!stop')){
                antre = fs.readFileSync('antre.txt','utf8')
                if (antre.includes(id)){        
                    fs.readFile('antre.txt', {encoding: 'utf-8'}, function(err, data) {
                        if (err) throw error;
                        let dataArray = data.split('\n')
                        var searchKeyword = id
                        let lastIndex = -1
                        for (let index=0; index<dataArray.length; index++) {
                            if (dataArray[index].includes(searchKeyword)) {
                                lastIndex = index
                                break; 
                            }
                        }
                        dataArray.splice(lastIndex, 1);
                        var updatedData = dataArray.join('\n');
                        fs.writeFile('antre.txt', updatedData, (err) => {
                            if (err) throw err;
                        });
                    });
                    conn.sendMessage(id,"Kamu Berhenti Mencari Teman\nKetik _*!find*_ Untuk Mencari Teman",MessageType.text)
                }
                else {
                    conn.sendMessage(id,"Kamu Sedang Tidak Mencari Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
                }
            }
            else if (text.includes('!python')){
                if (m.participant == '6285774148323@s.whatsapp.net' || m.key.remoteJid == '6285774148323@s.whatsapp.net' ) {
                    if (text == "!python"){
                        conn.sendMessage(id,"Input Code",MessageType.text,{ quoted: m })    
                    }
                    else{
                        var x = text.split("!python\n")[1]
                        if (x.length > 0){
                            var { execFile } = require("child_process");
                            var ls = execFile("python", ["shel.py",x])
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
                }
                else {
                    conn.sendMessage(id,"Hehey Not Bad",MessageType.text,{ quoted: m })
                }
            }
            else {
                if (room.includes(id)){
                    var a = require("child_process");
                    var ls = a.execSync("python regek.py "+id)
                    var snder = ls.toString().replace("\n","")
                    sendMsg(snder,text,type)
                }
                else {
                    conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
                }
            }
        }
        else {
            if (room.includes(id)){
                var a = require("child_process");
                var ls = a.execSync("python regek.py "+id)
                var snder = ls.toString().replace("\n","")
                if (messageType === MessageType.extendedText){
                    var mid = m.message.extendedTextMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,text,type,{quoted:quot})
                }
                else{
                    sendMsg(snder,text,type)
                }
            }
            else {
                conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
            }            
        }
    }
    else if (messageType === MessageType.contact) {
        var text = "Contact"
        if (room.includes(id)){
            var con = {displayname: m.message.contactMessage.displayName, vcard: m.message.contactMessage.vcard}
            var type = MessageType.contact
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.contactMessage.contextInfo){
                var mid = m.message.contactMessage.contextInfo.stanzaId
                var n = await conn.loadMessages(id,1000)
                var mem = n.messages
                idx = Object.keys(mem).length
                for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                sendMsg(snder,con,type,{quoted:quot})
            }
            else {
                sendMsg(snder,con,type)
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    else if (messageType === MessageType.location || messageType === MessageType.liveLocation){
        var text = "Location"
        if (room.includes(id)){        
            var loc = m.message.locationMessage || m.message.liveLocationMessage
            var info = {degreesLatitude: loc.degreesLatitude, degreesLongitude: loc.degreesLongitude}
            var type = MessageType.location
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.locationMessage.contextInfo || m.message.liveLocationMessage.contextInfo){
                var mid = m.message.locationMessage.contextInfo.stanzaId || m.message.liveLocationMessage.contextInfo.stanzaId
                var n = await conn.loadMessages(id,1000)
                var mem = n.messages
                idx = Object.keys(mem).length
                for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                sendMsg(snder,stiker,type,{quoted:quot})
             }
            else {
                sendMsg(snder,info,type)
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    else if (messageType === MessageType.sticker){
        var text = "Stiker"
        if (room.includes(id)){
            var stiker = await conn.downloadMediaMessage(m);
            var type = MessageType.sticker        
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.stickerMessage.isAnimated){
                if (m.message.stickerMessage.contextInfo){
                    var mid = m.message.stickerMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.sticker,isAnimated:true,quoted:quot})
                }
                else{
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.sticker,isAnimated:true})
                }
            }
            else {
                if (m.message.stickerMessage.contextInfo){
                    var mid = m.message.stickerMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type)
                }
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    else if (messageType === MessageType.image){
        var text = "Image"
        if (room.includes(id)){
            var stiker = await conn.downloadMediaMessage(m);
            var type = MessageType.image        
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.imageMessage.caption){
                var capt = m.message.imageMessage.caption
                if (m.message.imageMessage.contextInfo){
                    var mid = m.message.imageMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.image, caption: `${capt}`,quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.image, caption: `${capt}`})
                }
            }
            else {
                if (m.message.imageMessage.contextInfo){
                    var mid = m.message.imageMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type)
                }
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    else if (messageType === MessageType.video){
        var text = "Video"
        if (room.includes(id)){
            var stiker = await conn.downloadMediaMessage(m);
            var type = MessageType.video        
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.videoMessage.caption){
                var capt = m.message.videoMessage.caption
                if (m.message.videoMessage.gifPlayback){
                    if (m.message.videoMessage.contextInfo){
                        var mid = m.message.videoMessage.contextInfo.stanzaId
                        var n = await conn.loadMessages(id,1000)
                        var mem = n.messages
                        idx = Object.keys(mem).length
                        for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                        sendMsg(snder,stiker,type,{mimetype: Mimetype.gif, caption: `${capt}`,quoted:quot})
                    }
                    else {
                        sendMsg(snder,stiker,type,{mimetype: Mimetype.gif, caption: `${capt}`})
                    }
                }
                else {
                    if (m.message.videoMessage.contextInfo){
                        var mid = m.message.videoMessage.contextInfo.stanzaId
                        var n = await conn.loadMessages(id,1000)
                        var mem = n.messages
                        idx = Object.keys(mem).length
                        for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                        sendMsg(snder,stiker,type,{mimetype: Mimetype.video, caption: `${capt}`,quoted:quot})
                    }
                    else {
                        sendMsg(snder,stiker,type,{mimetype: Mimetype.video, caption: `${capt}`})
                    }
                }
            }
            else if(m.message.videoMessage.gifPlayback){
                if (m.message.videoMessage.contextInfo){
                    var mid = m.message.videoMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.gif,quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type,{mimetype: Mimetype.gif})
                }
            }
            else {
                if (m.message.videoMessage.contextInfo){
                    var mid = m.message.videoMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type)
                }
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    else if (messageType === MessageType.audio){
        var text = "Audio"
        if (room.includes(id)){
            var stiker = await conn.downloadMediaMessage(m);
            var type = MessageType.audio      
            var a = require("child_process");
            var ls = a.execSync("python regek.py "+id)
            var snder = ls.toString().replace("\n","")
            if (m.message.audioMessage.ptt){
                if (m.message.audioMessage.contextInfo){
                    var mid = m.message.audioMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{ mimetype: Mimetype.mp4Audio , ptt : true,quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type,{ mimetype: Mimetype.mp4Audio , ptt : true})
                }
            }
            else {
                if (m.message.audioMessage.contextInfo){
                    var mid = m.message.audioMessage.contextInfo.stanzaId
                    var n = await conn.loadMessages(id,1000)
                    var mem = n.messages
                    idx = Object.keys(mem).length
                    for (let i = idx; i > 0 ; i--) if(mem[i-1].key.id == mid){ var quot = mem[i-1]}
                    sendMsg(snder,stiker,type,{ mimetype: Mimetype.mp4Audio , ptt : false,quoted:quot})
                }
                else {
                    sendMsg(snder,stiker,type,{ mimetype: Mimetype.mp4Audio , ptt : false})
                }
            }
        }
        else {
            conn.sendMessage(id,"Kamu Sedang Tidak Terhubung Dengan Teman Ketik _*!find*_ Untuk Mencari Teman",MessageType.text)
        }
    }
    if (snder){
        var send = conn.contacts[snder].notify
    }
    else {
        var send = "Me"
    }
    console.log(`[${moment().format("HH:mm")}] ${idg} > ${send} : ${text}`);    
}
async function getmsg(){
    await conn.on("message-new",async m => {
        if (m.key.remoteJid.endsWith('.us')) {
            conn.chatRead(m.key.remoteJid);
        }
        else {
            if (!m.key.fromMe){
                gas(m)
            }
        }
    })
}
function sendMsg(id,text,type,opt=""){
    if(opt){
      conn.sendMessage(id,text,type,opt)
      conn.chatRead(id)
    }
    else {
      conn.sendMessage(id,text,type)
      conn.chatRead(id)
    }   
}
try{
    getmsg()
}
catch (err) {
    console.log(`[${moment().format('HH:mm:ss')}] ${err}`);
}