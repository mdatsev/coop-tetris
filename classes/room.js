const Well = require('./well');

class Room {
    constructor(maxPlayers, widthPerPlayer, height) {
        this.maxPlayers = maxPlayers;
        this.well = new Well(maxPlayers * widthPerPlayer, height);
        this.players = [];
        this.fullChecker = null;
        this.gameHeartbeat = null;
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
}

module.exports = Room;