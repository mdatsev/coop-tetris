const config = require('./config');
const tetriminos = require('./tetriminos');

const helpers = require('./helpers');
const Tetrimino = require('./classes/tetrimino');
const Well = require('./classes/well');
const Room = require('./classes/room');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('listening...');
});

let lastRoomID = 0;
const rooms = [];

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    let myRoom = false,
        playerID = null;
    socket.on('getConfig', () => {
        socket.emit('getConfigSuccess', config);
    });
    socket.on('key press', (keyPress) => {
        switch (keyPress) {
            case 'UP':
                rooms[myRoom].well.rotateTetrimino(playerID, 'right');
                break;
            case 'DOWN':
                console.log('TODO DOWN');
                break;
            case 'LEFT':
                rooms[myRoom].well.moveLeft(playerID);
                break;
            case 'RIGHT':
                rooms[myRoom].well.moveRight(playerID);
                break;
            default:
                break;
        }
    });
    socket.on('createRoom', (players) => {
        const roomID = ++lastRoomID;
        rooms[roomID] = new Room(players, 10, 22);
        for (let i = 0; i < players; i++) {
            rooms[roomID].well.summonTetrimino(randomTetrimino('random', 'random', 0, rooms[roomID].well.width), i);
            //TODO load from config...
            for (let j = 0; j < 5; j++) {
                rooms[roomID].well.addNext(randomTetrimino('random', 'random', 0, rooms[roomID].well.width), i);
            }
        }
        joinRoom(roomID, socket.id);
        io.sockets.emit('roomCreated', roomID);
    });
    socket.on('joinRoom', (room) => {
        joinRoom(room, socket.id);
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
    function joinRoom(room, id) {
        if (myRoom) {
            socket.leave(myRoom);
            rooms[myRoom].removePlayer(id);
        }
        if (!rooms[room]) {
            socket.emit('Error', `room '${room}' does not exist`);
            return;
        }
        socket.join(room);
        myRoom = room;
        if (!rooms[room].isFull() && rooms[room].players.indexOf(id) === -1) {
            playerID = rooms[room].addPlayer(id);
            if (rooms[room].isFull()) {
                activateRoom(room);
            }
        }
        socket.emit('roomJoined', rooms[room].maxPlayers);
    }
});

function activateRoom(room) {
    fullChecker(room);
    rooms[room].fullChecker = setInterval(fullChecker, 25, room);
    function fullChecker() {
        if (rooms[room].isFull() && !rooms[room].interval) {
            roomHeartbeat();
            rooms[room].interval = setInterval(roomHeartbeat, 100);
        } else if (!rooms[room].isFull() && rooms[room].interval) {
            clearInterval(rooms[room].interval);
        }
        function roomHeartbeat() {
            const fallen = rooms[room].well.step();
            for (let i = 0; i < fallen.length; i++) {
                rooms[room].well.addNext(randomTetrimino('random', 'random', 0, rooms[room].well.width), fallen[i]);
            }
            io.sockets.in(room).emit('well', rooms[room].well.getWell());
        }
    }
}

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