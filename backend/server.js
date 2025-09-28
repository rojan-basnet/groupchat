import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import http from 'http'
import path from 'path'

const app=express()
app.use(cors()) 
app.use(express.json())
dotenv.config()
const server=http.createServer(app)
const wss=new WebSocketServer({server})
const PORT=process.env.PORT||5000
const __dirname=path.resolve()

function broadcast(data){
    wss.clients.forEach(client=>{
        if(client.readyState===WebSocket.OPEN){
            client.send(JSON.stringify(data))
        }
    })
}
let clientCount=0

wss.on("connection",(ws)=>{
    clientCount++
    console.log("client connected",clientCount)
    broadcast({type:"count",count:clientCount})

    ws.on("message",(message)=>{
        console.log(message.toString())
        broadcast({type:"chat",text:message.toString()})
    })

    ws.on("close",()=>{
        clientCount--
        console.log("client connected",clientCount)
        broadcast({type:"count",count:clientCount})
    })

})

if(process.env.NODE_ENV==="production"){
    const frontendPath = path.join(__dirname, 'frontend', 'dist');
    app.use(express.static(frontendPath));

    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

server.listen(PORT,()=>{
    console.log(`Listening on port : ${PORT}`)
})