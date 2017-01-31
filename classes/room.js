const Well = require('./well');

class Room {
    constructor(numberOfPlayers, widthPerPlayer, height) {
        this.numberOfPlayers = numberOfPlayers;
        this.well = new Well(numberOfPlayers * widthPerPlayer, height);
        this.players = [];
    }

    addPlayer(id) {
        this.players.push(id);
    }

    isFull() {
        return this.players.length >= this.numberOfPlayers;
    }
}

module.exports = Room;