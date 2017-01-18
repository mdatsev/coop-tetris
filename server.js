const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config');
const KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40;

var well = create2DArray(10, 22);

function create2DArray(rows, cols) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}

function KeyPressHandler(keyPress) {
    switch (keyPress) {
        case KEY_LEFT:
            break;
        case KEY_UP:
            break;
        case KEY_RIGHT:
            break;
        case KEY_DOWN:
            break;
        default:
            break;
    }
}

app.get('/config', function(req, res) {
    res.send(config);
});

app.use(express.static('public'));

http.listen(3000, () => {
    console.log('listening...');
});

io.on('connection', function(socket) {
    socket.on('key press', function(data) {
        keyPressHandler(data);
    });
    console.log(`New connection: ${socket.id}`);
    socket.on('disconnect', function() {
        console.log(`Disconnected: ${socket.id}`);
    });
});