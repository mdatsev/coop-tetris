var socket = io();
document.onkeydown = (event) => {
    console.log('hi');
    if (event.keyCode === 38) {
        socket.emit('key press', 'UP');
    } else if (event.keyCode === 40) {
        socket.emit('key press', 'DOWN');
    } else if (event.keyCode === 37) {
        socket.emit('key press', 'LEFT');
    } else if (event.keyCode === 39) {
        socket.emit('key press', 'RIGHT');
    }
};