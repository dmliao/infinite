'use strict';

var Tool = require('../tool');

export default class MoveCanvasTool extends Tool {
    constructor(artwork) {
        super(artwork);
        this.current = createVector(0, 0);
        this.previous = createVector(0, 0);
    }

    onMousePress(mouseX, mouseY) {
        this.current.x = mouseX;
        this.current.y = mouseY;

        this.previous.x = mouseX;
        this.previous.y = mouseY;
    }

    onMouseMove(mouseX, mouseY) {
        this.current.x = mouseX;
        this.current.y = mouseY;
        let distX = this.current.x - this.previous.x;
        let distY = this.current.y - this.previous.y;

        this.artwork.offsetX -= distX;
        this.artwork.offsetY -= distY;

        this.artwork.draw();

        this.previous.x = this.current.x;
        this.previous.y = this.current.y;
    }
}