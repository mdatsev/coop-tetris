socket = io();

function setup() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/config", true);
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
            config = JSON.parse(xmlhttp.responseText);
            config.width = 2 * config.sidebarSize + config.wellWidth;
            config.height = config.sidebarSize + config.wellHeight + config.ground;
            console.log(config);
            createCanvas(config.width, config.height);
            background(config.backroundColor);
            noStroke();
            fill(config.wellColor);
            rect(config.sidebarSize, config.sidebarSize, config.wellWidth, config.wellHeight, config.round);
            fill(config.backroundColor);
            rect(0, 0, config.width, config.sidebarSize, config.round);
            rect(0, config.sidebarSize, config.sidebarSize, config.height - config.sidebarSize, config.round);
            rect(config.sidebarSize + config.wellWidth, config.sidebarSize, config.sidebarSize, config.height - config.sidebarSize, config.round);
        }
    };
    xmlhttp.send();
    socket.on('well', function(well) {
        console.log(well);
        stroke(config.backroundColor);
        for (let row = 0; row < well.matrix.length; row++) {
            for (let col = 0; col < well.matrix[row].length; col++) {
                fill(well.matrix[row][col]);
                rect(config.sidebarSize + col * config.scale, config.sidebarSize + row * config.scale, config.scale, config.scale);
            }
        }
    });
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
}

function draw() {

}