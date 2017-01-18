config = {};

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
    }
    xmlhttp.send();
}

const well = [
    ["#000064", "#0a0064", "#140064", "#1e0064", "#280064", "#320064", "#3c0064", "#460064", "#500064", "#5a0064"],
    ["#000a64", "#0a0a64", "#140a64", "#1e0a64", "#280a64", "#320a64", "#3c0a64", "#460a64", "#500a64", "#5a0a64"],
    ["#001464", "#0a1464", "#141464", "#1e1464", "#281464", "#321464", "#3c1464", "#461464", "#501464", "#5a1464"],
    ["#001e64", "#0a1e64", "#141e64", "#1e1e64", "#281e64", "#321e64", "#3c1e64", "#461e64", "#501e64", "#5a1e64"],
    ["#002864", "#0a2864", "#142864", "#1e2864", "#282864", "#322864", "#3c2864", "#462864", "#502864", "#5a2864"],
    ["#003264", "#0a3264", "#143264", "#1e3264", "#283264", "#323264", "#3c3264", "#463264", "#503264", "#5a3264"],
    ["#003c64", "#0a3c64", "#143c64", "#1e3c64", "#283c64", "#323c64", "#3c3c64", "#463c64", "#503c64", "#5a3c64"],
    ["#004664", "#0a4664", "#144664", "#1e4664", "#284664", "#324664", "#3c4664", "#464664", "#504664", "#5a4664"],
    ["#005064", "#0a5064", "#145064", "#1e5064", "#285064", "#325064", "#3c5064", "#465064", "#505064", "#5a5064"],
    ["#005a64", "#0a5a64", "#145a64", "#1e5a64", "#285a64", "#325a64", "#3c5a64", "#465a64", "#505a64", "#5a5a64"],
    ["#006464", "#0a6464", "#146464", "#1e6464", "#286464", "#326464", "#3c6464", "#466464", "#506464", "#5a6464"],
    ["#006e64", "#0a6e64", "#146e64", "#1e6e64", "#286e64", "#326e64", "#3c6e64", "#466e64", "#506e64", "#5a6e64"],
    ["#007864", "#0a7864", "#147864", "#1e7864", "#287864", "#327864", "#3c7864", "#467864", "#507864", "#5a7864"],
    ["#008264", "#0a8264", "#148264", "#1e8264", "#288264", "#328264", "#3c8264", "#468264", "#508264", "#5a8264"],
    ["#008c64", "#0a8c64", "#148c64", "#1e8c64", "#288c64", "#328c64", "#3c8c64", "#468c64", "#508c64", "#5a8c64"],
    ["#009664", "#0a9664", "#149664", "#1e9664", "#289664", "#329664", "#3c9664", "#469664", "#509664", "#5a9664"],
    ["#00a064", "#0aa064", "#14a064", "#1ea064", "#28a064", "#32a064", "#3ca064", "#46a064", "#50a064", "#5aa064"],
    ["#00aa64", "#0aaa64", "#14aa64", "#1eaa64", "#28aa64", "#32aa64", "#3caa64", "#46aa64", "#50aa64", "#5aaa64"],
    ["#00b464", "#0ab464", "#14b464", "#1eb464", "#28b464", "#32b464", "#3cb464", "#46b464", "#50b464", "#5ab464"],
    ["#00be64", "#0abe64", "#14be64", "#1ebe64", "#28be64", "#32be64", "#3cbe64", "#46be64", "#50be64", "#5abe64"],
    ["#00c864", "#0ac864", "#14c864", "#1ec864", "#28c864", "#32c864", "#3cc864", "#46c864", "#50c864", "#5ac864"],
    ["#00d264", "#0ad264", "#14d264", "#1ed264", "#28d264", "#32d264", "#3cd264", "#46d264", "#50d264", "#5ad264"]
];

function draw() {
    //socket.on('well', function(well) {
    for (let row = 0; row < well.length; row++) {
        for (let col = 0; col < well[row].length; col++) {
            //console.log(well[row][col]);
            fill(well[row][col]);
            rect(config.sidebarSize + col * config.scale, config.sidebarSize + row * config.scale, config.scale, config.scale);
        }
    }
    //});
}