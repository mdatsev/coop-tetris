const socket = io();

let config = {},
    userSettings = {},
    players = 2;

function setup() {
    addSocketListeners();
    addSocketEmitters();
}

function loadGame() {
    socket.on('getConfigSuccess', (data) => {
        loadConfig(data);
        loadUserSettings();
        drawCanvasElements();
    });
    socket.emit('getConfig');
}

function loadUserSettings() {
    if (Cookies.get('userSettings')) {
        Cookies.set('userSettings', config.defaultUserSettings);
    }
    userSettings = config.defaultUserSettings;
}

function addSocketEmitters() {
    document.onkeydown = (event) => {
        if (event.keyCode === userSettings.KEY_UP) {
            socket.emit('key press', 'UP');
        } else if (event.keyCode === userSettings.KEY_DOWN) {
            socket.emit('key press', 'DOWN');
        } else if (event.keyCode === userSettings.KEY_LEFT) {
            socket.emit('key press', 'LEFT');
        } else if (event.keyCode === userSettings.KEY_RIGHT) {
            socket.emit('key press', 'RIGHT');
        }
    };
    document.getElementById('joinRoom').onsubmit = () => {
        socket.emit('joinRoom', document.getElementById('room').value);
        return false;
    };
    document.getElementById('createRoom').onsubmit = () => {
        players = document.getElementById('players').value || players;
        socket.emit('createRoom', players);
        return false;
    };
}

function addSocketListeners() {
    socket.on('well', drawWell);
    socket.on('Error', (data) => {
        console.log(data);
    });
    socket.on('roomJoined', (maxPlayers) => {
        players = maxPlayers;
        loadGame();
    });
    socket.on('roomCreated', (id) => {
        console.log(id);
    });
}

function drawWell(well) {
    stroke(config.backroundColor);
    for (let row = 0; row < well.length; row++) {
        for (let col = 0; col < well[row].length; col++) {
            fill(well[row][col] || config.wellColor);
            rect(config.sidebarSize + (col * config.scale),
                config.sidebarSize + (row * config.scale),
                config.scale,
                config.scale);
        }
    }
}

function loadConfig(data) {
    config = data;

    config.width = 2 * config.sidebarSize + config.wellWidth * players;
    config.height = config.sidebarSize + config.wellHeight + config.ground;
}

function drawCanvasElements() {
    createCanvas(config.width, config.height);
    drawTopPanel();
    drawLeftPanel();
    drawRightPanel();
}

function drawTopPanel() {
    fill(config.backroundColor);
    rect(
        0,
        0,
        config.width,
        config.sidebarSize);
}

function drawLeftPanel() {
    fill(config.backroundColor);
    rect(
        0,
        config.sidebarSize,
        config.sidebarSize,
        config.height - config.sidebarSize);
}

function drawRightPanel() {
    rect(
        config.sidebarSize + config.wellWidth * players,
        config.sidebarSize,
        config.sidebarSize,
        config.height - config.sidebarSize);
}

function drawWellPanel() {
    fill(config.wellColor);
    rect(
        config.sidebarSize,
        config.sidebarSize,
        config.wellWidth * players,
        config.wellHeight);
}