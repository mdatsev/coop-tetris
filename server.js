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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/config', (req, res) => {
    res.send(config);
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('listening...');
});

let currentRoomID = 0;
const rooms = [];

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    let roomID,
        playerID;
    socket.on('getConfig', () => {
        socket.emit('getConfigSuccess', config);
    });
    socket.on('key press', (keyPress) => {
        switch (keyPress) {
            case 'UP':
                rooms[roomID].well.rotateTetrimino(playerID, 'right');
                break;
            case 'DOWN':
                console.log('TODO DOWN');
                break;
            case 'LEFT':
                rooms[roomID].well.moveLeft(playerID);
                break;
            case 'RIGHT':
                rooms[roomID].well.moveRight(playerID);
                break;
            default:
                break;
        }
    });
    socket.on('createRoom', (players) => {
        roomID = currentRoomID++;
        rooms[roomID] = new Room(players, 10, 22);
        joinRoom(roomID, socket.id);
        rooms[roomID].well.summonTetrimino(randomTetrimino('random', 'random', 0, rooms[roomID].well.width));
        for (let i = 0; i < 5; i++) { //todo load from config...
            rooms[roomID].well.addNext(randomTetrimino('random', 'random', 0, rooms[roomID].well.width), 0);
        }
        io.sockets.emit('roomCreated', roomID);

        const fullChecker = setInterval(() => {
            if (rooms[roomID].isFull()) {
                setInterval(() => {
                    const fallen = rooms[roomID].well.step();
                    for (let i = 0; i < fallen.length; i++) {
                        rooms[roomID].well.addNext(randomTetrimino('random', 'random', 0, rooms[roomID].well.width), fallen[i]);
                    }
                    io.sockets.in(roomID).emit('well', rooms[roomID].well.getWell());
                }, 100);
                clearInterval(fullChecker);
            }
        }, 100);
    });
    socket.on('joinRoom', (room) => {
        joinRoom(room, socket.id);
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
    function joinRoom(room, id) {
        socket.leave(roomID);
        if (!rooms[room]) {
            socket.emit('Error', `room '${room}' does not exist`);
            return;
        }
        socket.join(room);
        if (!rooms[room].isFull() && rooms[room].players.indexOf(id) === -1) {
            roomID = room;
            playerID = rooms[room].addPlayer(id);
        }
        socket.emit('roomJoined', rooms[room].maxPlayers);
    }
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