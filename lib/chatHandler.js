const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

const chatServer = server => {
    // -- 2. Initializa the WS Server
    const wss = new WebSocket.Server({ server });

    //handling Client Connecction
    wss.on('connection', (ws) => {
        // a) In case of a message from a client
        ws.on('message', (message) => {
            console.log(`Recieved: ${message}`);

            chatServer.clients.forEach(client => {
                if (client.readyState == WebSocket.OPEN) {
                    client.send(message);
                }
            });
        })

        //b) Send a 'connection' message
        ws.send('Welcome to the chat');
    })
}

module.exports = { chatServer }