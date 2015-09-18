'use strict';

export default class Layer {
    constructor(name) {
        this.name = name;
        this.strokes = []; // array of Stroke objects
        this.opacity = 1;
        this.visible = true;
    }

    getStrokes() {
        return this.strokes;
    }
    addStroke(stroke) {
        this.strokes.push(stroke);
    }

    toggleVisible() {
        this.visible = !this.visible;
    }

    // redraw all strokes on this layer (essentially redraws the layer)
    draw() {
        for (let i = 0; i < this.strokes.length; i++) {
            this.strokes[i].draw();
        }
    }
}