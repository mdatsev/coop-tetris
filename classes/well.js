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
        if (this.checkCollision(tetrimino.currentRotation(), tetrimino.x, tetrimino.y)) {
            this.activeTetriminos.push(tetrimino);
            this.nextQueue.shift();
            return true;
        }
        return false;
    }

    checkCollision(arr, x, y) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                //DOesnt work
                if ((arr[i][j] && this.matrix[i + y][j + x]) || ((i + y) > this.matrix.height - 1) || ((i + x) > this.matrix.width - 1)) {
                    return false;
                }
            }
        }
        return true;
    }

    rotateTetrimino(index) {

    }

    getWell() {

        const well = [];
        for (let i = 0; i < this.matrix.length; i++) {
            well[i] = this.matrix[i].slice();
        }

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
        for (let i = 0; i < this.activeTetriminos.length; i++) {
            if (this.checkCollision(this.activeTetriminos[i], this.activeTetriminos[i].x, this.activeTetriminos[i].y)) {
                this.activeTetriminos[i].y++;
            }
        }
    }
}

module.exports = Well;