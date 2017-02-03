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

    //TODO make it check for leftConstraint and clean up
    static randomTetrimino(tetriminos, colors, x, y, leftConstraint, rightConstraint) {
        const keys = Object.keys(tetriminos),
            randomKey = Math.floor(Math.random() * keys.length),
            randomT = tetriminos[keys[randomKey]];
        let color = `#${Math.floor(
            Math.random() * 16777215
        ).toString(16)}`;
        if (colors[randomKey]) {
            color = colors[randomKey];
        }
        return new Tetrimino(randomT, color, x, y);
    }
}

module.exports = Tetrimino;