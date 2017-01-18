function create2DArray(rows, cols) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}
function rgbToHex(r, g, b) {
    function componentToHex(c) {
        var hex = c.toString(16);

        return hex.length === 1 ? '0' + hex : hex;
    }

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

module.exports = {
    create2DArray: create2DArray,
    rgbToHex: rgbToHex
};
