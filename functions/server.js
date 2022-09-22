const qrcode = require('qrcode-terminal');
const express= require("express");
const cors= require("cors")
const serverless= require("serverless-http")
const { Client } = require('whatsapp-web.js');
const client = new Client();

const app=express();
const router=express.Router()

router.use(cors())

router.get("/",(req,res)=>{
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        res.json(qr)
    });
})



// app.listen(5000,()=>{
//     console.log("listening")
// })

app.use("/.netlify/functions/server",router)

module.exports.handler= serverless(app)


    client.on('ready', () => {
        setInterval(()=>{
            console.log('Client is ready!');
       
            // Number where you want to send the message.
           const number = "+919839231510";
          
            // Your message.
           const text = "Hey john";
          
            // Getting chatId from the number.
            // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
           const chatId = number.substring(1) + "@c.us";
          
           // Sending message.
           client.sendMessage(chatId, text);
        },3600000)
       
       });




// client.on('message', message => {
// 	console.log(message.body);
// });


// client.on('message', message => {
// 	if(message.body === '!ping') {
// 		message.reply('pong');
// 	}
// });



client.initialize();
