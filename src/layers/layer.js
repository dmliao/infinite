'use strict';

var Stroke = require('../elements/stroke');
var clearContext = require('../polyfill/clear');

export default class Layer {
    constructor(name, canvasID, artwork) {
        this.name = name;
        this.strokes = []; // array of Stroke objects
        this.opacity = 1;
        this.visible = true;

        this.artwork = artwork;

        this.id = canvasID;
    }

    getContext() {
        return document.getElementById(this.id).getContext('2d');
    }

    getStrokes() {
        return this.strokes;
    }

    // adds a stroke to this layer using the appropriate brush, then returns the stroke
    addStroke(brush, color) {
        let stroke = new Stroke(brush, color, this);
        stroke.layer = this;
        this.strokes.push(stroke);

        return stroke;
    }

    toggleVisible() {
        this.visible = !this.visible;
    }

    // redraw all strokes on this layer (essentially redraws the layer)
    // with the given offsets and scale
    draw(offsetX, offsetY, scale) {
        // clear the layer
        clearContext(this.getContext());

        for (let i = 0; i < this.strokes.length; i++) {
            this.strokes[i].draw(offsetX, offsetY, scale);
        }
    }

    toJSON() {
        let json = {
            name: this.name,
            strokes: [],
            opacity: this.opacity,
            visible: this.visible
        };
        for (let i = 0; i < this.strokes.length; i++) {
            json.strokes.push(this.strokes[i].toJSON());
        }

        return json;
    }
}