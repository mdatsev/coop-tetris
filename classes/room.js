const Well = require('./well');

class Room {
    constructor(maxPlayers, widthPerPlayer, height) {
        this.maxPlayers = maxPlayers;
        this.well = new Well(maxPlayers * widthPerPlayer, height);
        this.players = [];
    }

    addPlayer(id) {
        this.players.push(id);
    }

    isFull() {
        return this.players.length >= this.maxPlayers;
    }
}

module.exports = Room;