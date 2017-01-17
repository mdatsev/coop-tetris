const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

http.listen(3000, () => {
    console.log('listening...');
});

io.on('connection', function(socket) {
    console.log(`New connection: ${socket.id}`);
    socket.on('disconnect', function() {
        console.log(`Disconnected: ${socket.id}`);
    });
});