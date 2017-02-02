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

        if (!this.nextQueues[queueIndex]) {
            this.nextQueues[queueIndex] = [];
        }
        this.nextQueues[queueIndex].push(tetrimino);
    }

    summonTetrimino(tetrimino, index) {
        if (!this.collides(tetrimino.currentRotation(), tetrimino.x, tetrimino.y)) {
            this.activeTetriminos[index] = tetrimino;
            return true;
        }
        return false;
    }

    collides(arr, x, y) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (((i + y) >= this.height) ||
                    ((i + y) < 0) ||
                    ((j + x) >= this.width) ||
                    ((j + x) < 0) ||
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

    move(x, tetriminoIndex) {
        const t = this.activeTetriminos[tetriminoIndex];
        if (!this.collides(t.currentRotation(), t.x + x, t.y)) {
            t.x += x;
        }
    }

    moveLeft(tetriminoIndex) {
        this.move(-1, tetriminoIndex);
    }

    moveRight(tetriminoIndex) {
        this.move(1, tetriminoIndex);
    }

    rotateTetrimino(tetriminoIndex, rotationMode) {
        const t = this.activeTetriminos[tetriminoIndex];
        let rotationIndex = t.currentRotationIndex;
        if (rotationIndex + 1 < t.rotations.length && rotationMode === 'right') {
            rotationIndex += 1;
        } else if (rotationMode === 'right') {
            rotationIndex = 0;
        }
        if (rotationIndex - 1 > 0 && rotationMode === 'left') {
            rotationIndex -= 1;
        } else if (rotationMode === 'left') {
            rotationIndex = t.rotations.length - 1;
        }
        if (!this.collides(t.rotations[rotationIndex], t.x, t.y)) {
            t.currentRotationIndex = rotationIndex;
        } else if (!this.collides(t.rotations[rotationIndex], t.x, t.y - 1)) {
            t.currentRotationIndex = rotationIndex;
            t.y -= 1;
        } else if (!this.collides(t.rotations[rotationIndex], t.x + 1, t.y - 1)) {
            t.currentRotationIndex = rotationIndex;
            t.y -= 1;
            t.x += 1;
        } else if (!this.collides(t.rotations[rotationIndex], t.x + 2, t.y - 1)) {
            t.currentRotationIndex = rotationIndex;
            t.y -= 1;
            t.x += 2;
        } else if (!this.collides(t.rotations[rotationIndex], t.x - 1, t.y - 1)) {
            t.currentRotationIndex = rotationIndex;
            t.y -= 1;
            t.x -= 1;
        } else if (!this.collides(t.rotations[rotationIndex], t.x - 2, t.y - 1)) {
            t.currentRotationIndex = rotationIndex;
            t.y -= 1;
            t.x -= 2;
        }
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

    clearLines(lines) {
        for (var i = 0; i < lines.length; i++) {
            console.log(this.matrix);
            console.log('############################################################');
            this.matrix.splice(lines[i], 1);
            this.matrix.unshift((new Array(this.width)).fill(null));
            console.log(this.matrix);
        }
    }

    fullLines() {
        let lines = [];
        for (let i = 0; i < this.height; i++) {
            let full = true;
            for (let j = 0; j < this.width; j++) {
                if (!this.matrix[i][j]) {
                    full = false;
                }
            }
            if (full) {
                lines.push(i);
            }
        }
        return lines;
    }

    step() {
        const fallen = [];
        for (let i = 0; i < this.activeTetriminos.length; i++) {
            const t = this.activeTetriminos[i];
            if (this.collides(t.currentRotation(), t.x, t.y + 1)) {
                this.addToMatrix(t.currentRotation(), t.x, t.y, t.color);
                this.clearLines(this.fullLines());
                this.activeTetriminos[i] = [];
                if (this.summonTetrimino(this.nextQueues[i][0], i)) {
                    this.nextQueues[i].shift();
                }
                fallen.push(i);
            }
            t.y++;
        }

        return fallen;
    }
}

module.exports = Well;