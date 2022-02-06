const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT_SERVER || 5000;
// const HOST = process.env.HOST_SERVER || '0.0.0.0';
console.log('===>', process.env.PORT_SERVER, process.env.HOST_SERVER)
wss.on('connection', (ws) => {
    console.log("New connection");
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        });
    })
    ws.send('Hello!');
})

app.get('/', (req, res) => {
    res.send('hello world')
});

server.listen(PORT, () => {console.log('running on', PORT)})
