const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT_SERVER || 5000;
const HOST = '0.0.0.0';

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

server.listen(PORT, '0.0.0.0')
console.log('running on', PORT)