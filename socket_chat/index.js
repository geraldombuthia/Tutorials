import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {

    console.log('A user connected', socket.id);

    socket.on('chat message', (msg, callback) => {
        console.log('message: ', msg);
        if (typeof callback === 'function') {
            callback('Message received and broadcasted');
          }
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});



server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})