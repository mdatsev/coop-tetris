const wellWidth = 200,
    wellHeight = 440,
    sidebarSize = 75,
    ground = 10,
    round = 0,
    width = 2 * sidebarSize + wellWidth,
    height = sidebarSize + wellHeight + ground,
    wellColor = '#33343a',
    sidebarColor = '#52596d',
    backroundColor = '#52596d';

function setup() {
    createCanvas(width + 1, height + 1);
    background(backroundColor);
    noStroke();
    fill(wellColor);
    rect(sidebarSize, sidebarSize, wellWidth, wellHeight, round / 2);
    fill(backroundColor);
    rect(0, 0, width, sidebarSize, round);
    rect(0, sidebarSize, sidebarSize, height - sidebarSize, round);
    rect(sidebarSize + wellWidth, sidebarSize, sidebarSize, height - sidebarSize, round);
}

function draw() {

}