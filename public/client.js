const socket = io();
let config = {},
    userSettings = {};

function setup() {
    requestConfig()
        .then(loadConfig)
        .then(loadUserSettings)
        .then(drawCanvasElements)
        .catch((err) => {
            console.error(`Err getting config:${err.status} ${err.statusText}`);
        });
    addSocketEventListeners();
    addSocketEmitters();
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
}

function addSocketEventListeners() {
    socket.on('well', (well) => {
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
    });
}

function requestConfig() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/config');
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function loadConfig(data) {
    config = JSON.parse(data);

    config.width = 2 * config.sidebarSize + config.wellWidth;
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
        config.sidebarSize + config.wellWidth,
        config.sidebarSize,
        config.sidebarSize,
        config.height - config.sidebarSize);
}

function drawWellPanel() {
    fill(config.wellColor);
    rect(
        config.sidebarSize,
        config.sidebarSize,
        config.wellWidth,
        config.wellHeight);
}