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
            randomT = tetriminos[keys[randomKey]],
            tWidth = randomT[0].length;
        let color = `#${Math.floor(
            Math.random() * 16777215
        ).toString(16)}`,
            newX = x;
        if (colors[keys[randomKey]]) {
            color = colors[keys[randomKey]];
        }

        /* not working anyway
        if (x === 'random') {
            newX = Math.random() * (rightConstraint + tWidth - leftConstraint + 1) + leftConstraint;
        }
        */
        if (x === 'center') {
            newX = leftConstraint + (rightConstraint - leftConstraint - tWidth) / 2;
        }

        return new Tetrimino(randomT, color, Math.floor(newX), y);
    }
}

module.exports = Tetrimino;