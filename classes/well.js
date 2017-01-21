var helpers = require("../helpers.js");
class Well {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = helpers.create2DArray(width, height);
        this.nextQueue = [];
    }

    addNext(tetrimino) {
        this.nextQueue.push(tetrimino);
    }

    summonTetrimino(tetrimino = this.nextQueue[0]) {

        this.nextQueue.shift();
    }

    step() {

    }
}

module.exports = Well;