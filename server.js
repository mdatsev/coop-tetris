var helpers = require("./helpers");
var Well = require("./classes/well");
var Tetrimino = require('./classes/tetrimino');

const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const config = require('./config');
const tetriminos = require('./tetriminos');

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

app.get('/config', function (req, res) {
    res.send(config);
});

app.use(express.static('public'));

http.listen(3000, () => {
    console.log('listening...');
});

io.on('connection', function (socket) {
    const well = new Well(10, 22);
    well.summonTetrimino(randomTetrimino('random', 'random', 0, well.width));
    well.addNext(randomTetrimino('random', 'random', 0, well.width), 0);
    setInterval(() => {
        fallen = well.step();
        for (let i = 0; i < fallen.length; i++) {
            well.addNext(randomTetrimino('random', 'random', 0, well.width), fallen[i])
        }
        socket.emit('well', well.getWell());
    }, 50);
    socket.on('key press', keyPressHandler);
    console.log(`New connection: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
});

function randomTetrimino(color, x, y, wellWidth) {
    const keys = Object.keys(tetriminos),
        randomT = tetriminos[
            keys[
            Math.floor(Math.random() * keys.length)
            ]
        ];
    if (color === 'random') {
        color = `#${Math.floor(
            Math.random() * 16777215
        ).toString(16)}`;
    }
    if (x === 'random') {
        x = Math.floor(
            Math.random() * (wellWidth - randomT[0].length)
        );
    }
    return new Tetrimino(randomT, color, x, y);
}