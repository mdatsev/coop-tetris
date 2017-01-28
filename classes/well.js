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
        if (this.collides(tetrimino.currentRotation())) {
            this.activeTetriminos.push(tetrimino);
            this.nextQueue.shift();
            return true;
        }
        return false;
    }

    collides(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] && this.matrix[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }

    rotateTetrimino(tetriminoIndex, rotationIndex) {
        console.log(this.activeTetriminos);
        if (!this.collides(this.activeTetriminos[tetriminoIndex].rotations[rotationIndex])) {
             this.activeTetriminos[terminoIndex].currentRotationIndex = rotationIndex;
         }
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
                        well[j + this.activeTetriminos[i].y][k + this.activeTetriminos[i].x] = this.activeTetriminos[i].color;
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