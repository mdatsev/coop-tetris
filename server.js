const clientConfig = require('./clientConfig');
const serverConfig = require('./serverConfig');
const tetriminos = require('./SRS');
const tetriminoColors = require('./colors');

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

server.listen(serverConfig.port, () => {
    console.log('listening...');
});

let lastRoomID = 0;
const rooms = [];

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    let myRoom = false,
        playerID = null;
    socket.on('getConfig', () => {
        socket.emit('getConfigSuccess', clientConfig);
    });
    socket.on('key press', (keyPress) => {
        if (rooms[myRoom].isFull()) {
            switch (keyPress) {
                case 'UP':
                    rooms[myRoom].well.rotateTetrimino(playerID, 'right');
                    emitWell(myRoom);
                    break;
                case 'DOWN':
                    rooms[myRoom].gameHeartbeat(playerID);
                    break;
                case 'LEFT':
                    rooms[myRoom].well.moveLeft(playerID);
                    emitWell(myRoom);
                    break;
                case 'RIGHT':
                    rooms[myRoom].well.moveRight(playerID);
                    emitWell(myRoom);
                    break;
                default:
                    break;
            }
        }
    });
    socket.on('createRoom', (players) => {
        const roomID = ++lastRoomID;
        rooms[roomID] = new Room(
            players,
            serverConfig.wellWidth,
            serverConfig.wellHeight,
            roomID,
            io,
            tetriminos,
            tetriminoColors,
            serverConfig.nextQueueSize
        );
        rooms[roomID].setup();
        joinRoom(roomID, socket.id);
        io.sockets.emit('roomCreated', roomID);
    });
    socket.on('joinRoom', (room) => {
        joinRoom(room, socket.id);
    });
    socket.on('requestWell', () => {
        socket.emit('well', rooms[myRoom].well.getWell());
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
                rooms[room].activate();
            }
        }
        socket.emit('roomJoined', rooms[room].maxPlayers);
    }
});

function emitWell(room) {
    io.sockets.in(room).emit('well', rooms[room].well.getWell());
}