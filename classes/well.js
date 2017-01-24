const helpers = require('../helpers.js');

class Well {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = helpers.create2DArray(width, height);
        this.nextQueue = [];
        this.activeTetriminos = [];
    }

    addNext(tetrimino) {
        this.nextQueue.push(tetrimino);
    }

    summonTetrimino(tetrimino = this.nextQueue[0]) {
        if (this.checkCollision(tetrimino.currentRotation())) {
            this.activeTetriminos.push(tetrimino);
            this.nextQueue.shift();
            return true;
        }
        return false;
    }

    checkCollision(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] && this.matrix[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    rotateTetrimino(index) {

    }

    getWell() {
        const well = this.matrix;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                well[i][j] = this.matrix[i][j];
            }
        }

        for (let i = 0; i < this.activeTetriminos.length; i++) {
            for (let j = 0; j < this.activeTetriminos[i].currentRotation().length; j++) {
                for (let k = 0; k < this.activeTetriminos[i].currentRotation()[j].length; k++) {
                    if (this.activeTetriminos[i].currentRotation()[j][k]) {
                        well[j][k] = this.activeTetriminos[i].color;
                    }
                }
            }
        }
        return well;
    }

    step() {

    }
}

module.exports = Well;