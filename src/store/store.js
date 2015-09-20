'use strict';

var CanvasStack = require('../vendor/canvasStack1v06');

var Layer = require('../layers/layer');

// functions to get and set storage
export default class Store {
    constructor(canvasID) {
        this.layers = [];
        this.canvasStack = new CanvasStack(canvasID);
        this.createLayer("Layer 0");

        this.currentLayer = 0;

        // canvas properties
        this.offsetX = 0;
        this.offsetY = 0;

    }

    createLayer(name) {
        let canvasID = this.canvasStack.createLayer();
        this.layers.push(new Layer(name, canvasID, this));

    }

    draw() {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].draw(this.offsetX, this.offsetY);
        }
    }

    getCurrentLayer() {
        return this.layers[this.currentLayer];
    }

    toJSON() {
        let json = {
            layers: []
        };
        for (let i = 0; i < this.layers.length; i++) {
            json.layers.push(this.layers[i].toJSON());
        }

        return json;
    }
}