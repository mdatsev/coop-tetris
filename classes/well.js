const helpers = require('../helpers.js');

class Well {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.matrix = helpers.create2DArray(height, width);
        this.nextQueues = [[]];
        this.activeTetriminos = [];
    }

    addNext(tetrimino, queueIndex) {
        this.nextQueues[queueIndex].push(tetrimino);
    }

    summonTetrimino(tetrimino) {
        if (!this.collides(tetrimino.currentRotation(), tetrimino.x, tetrimino.y)) {
            this.activeTetriminos.push(tetrimino);
            return true;
        }
        return false;
    }

    collides(arr, x, y) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (((i + y) >= this.height) ||
                    ((j + x) >= this.width) ||
                    (arr[i][j] && this.matrix[i + y][j + x])) {
                    return true;
                }
            }
        }
        return false;
    }

    addToMatrix(arr, x, y, color) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j]) {
                    this.matrix[i + y][j + x] = color;
                }
            }
        }
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
            const t = this.activeTetriminos[i];
            for (let j = 0; j < t.currentRotation().length; j++) {
                const r = t.currentRotation();
                for (let k = 0; k < r[j].length; k++) {
                    if (r[j][k]) {
                        well[j + t.y][k + t.x] = t.color;
                    }
                }
            }
        }

        return well;
    }

    step() {
        for (let i = 0; i < this.activeTetriminos.length; i++) {
            const t = this.activeTetriminos[i];
            if (this.collides(t.currentRotation(), t.x, t.y + 1)) {
                this.addToMatrix(t.currentRotation(), t.x, t.y, t.color);
                this.activeTetriminos.shift();
                this.activeTetriminos.push(this.nextQueues[i][0] || t); // temporary fix
                this.nextQueues[i].shift();
            } else {
                t.y++;
            }
        }
    }
}

module.exports = Well;