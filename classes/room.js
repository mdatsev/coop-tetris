const Well = require('./well');
const Tetrimino = require('./tetrimino');

class Room {
    constructor(maxPlayers, widthPerPlayer, height, id, io, tetriminoRotations, tetriminoColors, nextQueueSize) {
        this.maxPlayers = maxPlayers;
        this.well = new Well(maxPlayers * widthPerPlayer, height);
        this.players = [];
        this.id = id;
        this.io = io;
        this.tetriminoColors = tetriminoColors;
        this.tetriminoRotations = tetriminoRotations;
        this.randomTetriminoParams = [this.tetriminoRotations, this.tetriminoColors, 0, 0, 0, this.well.width]; //TODO
        this.nextQueueSize = nextQueueSize;
    }

    addPlayer(id) {
        return this.players.push(id) - 1;
    }

    removePlayer(id) {
        this.players.splice(id);
    }

    isFull() {
        return this.players.length >= this.maxPlayers;
    }

    fullChecker() {
        if (this.isFull() && !this.gameHeartBeatInterval) {
            this.gameHeartbeat();
            this.gameHeartBeatInterval = setInterval(this.gameHeartbeat.bind(this), 750); //TODO
        } else if (!this.isFull() && this.interval) {
            clearInterval(this.gameHeartbeat);
        }
    }

    setup() {
        for (let i = 0; i < this.maxPlayers; i++) {
            this.well.summonTetrimino(
                Tetrimino.randomTetrimino(...this.randomTetriminoParams),
                i
            );
            for (let j = 0; j < this.nextQueueSize; j++) {
                this.well.addNext(
                    Tetrimino.randomTetrimino(...this.randomTetriminoParams),
                    i
                );
            }
        }
    }

    gameHeartbeat(playerID) {
        const fallen = this.well.step(playerID).fallen;
        this.emitWell();
        for (let i = 0; i < fallen.length; i++) {
            this.well.addNext(Tetrimino.randomTetrimino(...this.randomTetriminoParams), fallen[i]);
        }
    }

    activate() {
        this.fullChecker();
        this.fullCheckerInterval = setInterval(this.fullChecker.bind(this), 25); //TODO
    }

    emitWell() {
        this.io.sockets.in(this.id).emit('well', this.well.getWell());
    }

}

module.exports = Room;