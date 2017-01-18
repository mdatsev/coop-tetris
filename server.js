const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config');

function rgbToHex(r, g, b) {
    function componentToHex(c) {
        var hex = c.toString(16);

        return hex.length === 1 ? '0' + hex : hex;
    }

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function create2DArray(rows, cols) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}

class Well {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = create2DArray(width, height);
    }
}

function keyPressHandler(keyPress) {
    switch (keyPress) {
        case 'UP':
            console.log('TODO UP');
            break;
        case 'DOWN':
            console.log('TODO DOWN');
            break;
        case 'LEFT':
            console.log('TODO LEFT');
            break;
        case 'RIGHT':
            console.log('TODO RIGHT');
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
    well = new Well(10, 22);
    demoCounter = 0;
    setInterval(() => {
        for (let row = 0; row < well.matrix.length; row++) {
            for (let col = 0; col < well.matrix[row].length; col++) {
                well.matrix[row][col] = rgbToHex(row + demoCounter, col + demoCounter, 100);
            }
        }
        socket.emit('well', well);
        demoCounter++;
    }, 100);
    socket.on('key press', keyPressHandler);
    console.log(`New connection: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});