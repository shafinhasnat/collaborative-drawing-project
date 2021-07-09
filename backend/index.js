const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

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

server.listen(5000, () => console.log('Listening on port 5000'))