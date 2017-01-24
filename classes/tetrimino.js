class Tetrimino {
    constructor(rotations, color) {
        this.rotations = rotations;
        this.color = color;
        this.currentRotationIndex = 0;
        this.x = 0;
        this.y = 0;
    }

    currentRotation() {
        return this.rotations[this.currentRotationIndex];
    }
}

module.exports = Tetrimino;