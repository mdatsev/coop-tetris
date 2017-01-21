const helpers = require('../helpers.js');

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
        for (let i = 0; i < tetrimino[0].length; i++) {
            for (let j = 0; j < tetrimino[0][i].length; j++) {
                this.well.matrix[i][j] = tetrimino[0][i][j];
            }
        }
        this.nextQueue.shift();
    }

    step() {

    }
}

module.exports = Well;