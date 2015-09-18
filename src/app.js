// dependencies

var Stroke = require('./elements/stroke');
var Store = require('./store/store');

global.Artwork = new Store();

// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

var currentStroke;

console.log("Loaded");

// p5 stuff
global.setup = function() {

    console.log("Setup");
    createCanvas(windowWidth, windowHeight);
    current = createVector(0, 0);
    previous = createVector(0, 0);

}

global.draw = function() {
    clear();
    global.Artwork.getCurrentLayer().draw();
}

// Start it up
global.mousePressed = function() {
    previous.x = mouseX;
    previous.y = mouseY;
    currentStroke = new Stroke(mouseX, mouseY, null);
    global.Artwork.getCurrentLayer().addStroke(currentStroke);
}

global.mouseDragged = function() {
    if (!currentStroke) {
        return false;
    }
    currentStroke.addPoint(mouseX, mouseY, {
        thickness: Math.random() * 4 + 1
    });
}

// Stop
global.mouseReleased = function() {
    console.log(global.Artwork.getCurrentLayer());
}