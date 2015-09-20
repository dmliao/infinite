// dependencies
var Stroke = require('./elements/stroke');
var Store = require('./store/store');

var KeyController = require('./keyboard/keyController');

var Toolbox = require('./tools/toolbox');

global.Artwork;

var currentStroke;

console.log("Loaded");

// p5 stuff
global.setup = function() {

    console.log("Setup");
    createCanvas(windowWidth, windowHeight);

    global.Artwork = new Store('defaultCanvas');

    // initialize keyboard shortcuts
    global.KeyController = new KeyController();

    global.Toolbox = new Toolbox(global.Artwork);

}

global.draw = function() {

    // update the current tool, as needed
    global.Toolbox.getCurrentTool().update();

}

// Start it up
global.mousePressed = function() {
    global.Toolbox.getCurrentTool().onMousePress(mouseX, mouseY);
}

global.mouseDragged = function() {
    global.Toolbox.getCurrentTool().onMouseMove(mouseX, mouseY);
}

// Stop
global.mouseReleased = function() {
    global.Toolbox.getCurrentTool().onMouseRelease(mouseX, mouseY);
}