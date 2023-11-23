const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// const { exec } = require('child_process');

// // Run Python script using a child process
// const pythonProcess = exec('python script.py', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing Python script: ${error}`);
//         return;
//     }
//     console.log(`Python script output: ${stdout}`);
// });

// pythonProcess.on('exit', (code) => {
//     console.log(`Python script exited with code ${code}`);
// });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Serve the HTML and CSS files
app.use(express.static('public'));

app.get('', (req, res) => {
    const sendButton = "Send the message";
    res.render("chat", {sendButton: sendButton});
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
