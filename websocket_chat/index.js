// import express from 'express';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import WebSocket from 'node:ws';

const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (ws) => {
    console.log("New client connected");

    let welcomeText = {
        message: "Welcome to the WebSocket server",
        timestamp: new Date().toLocaleString(),
        timeformat: "locale_string",
        senderId: "server"
    };
    // Send a welcome message to the connected client
    ws.send(JSON.stringify(welcomeText));

    // Listen for messages from the client
    ws.on('message', (message) => {
        let payload = JSON.parse(message);
        console.log(`Received message from client: ${payload.message} sent at ${payload.timestamp} by ${payload.senderId}`);

        // Send the received message back to all connected clients (broadcast)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${JSON.stringify(payload)}`);
            }
        });
    });

    // Handle the connection close event
    ws.on('close', () => {
        console.log('Client disconnected');
    })
})
// const app = express();
// const webSocketServer = new webSocket("wss://localhost:8080/chat");

// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.get('/', (req, res) => { 
//     res.sendFile(join(__dirname, 'index.html'));
// });

// app.listen(8080, () => {
//     console.log('Server is running on port 8080')
// })