var helpers = require("../helpers.js");
class Well {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = helpers.create2DArray(width, height);
    }
}

module.exports = Well;