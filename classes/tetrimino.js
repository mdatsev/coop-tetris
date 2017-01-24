class Tetrimino {
    constructor(rotations, color, x, y) {
        this.rotations = rotations;
        this.color = color;
        this.currentRotationIndex = 0;
        this.x = x;
        this.y = y;
    }

    currentRotation() {
        return this.rotations[this.currentRotationIndex];
    }
}

module.exports = Tetrimino;