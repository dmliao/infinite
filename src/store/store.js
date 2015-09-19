'use strict';

var Layer = require('../layers/layer');

// functions to get and set storage
export default class Store {
    constructor() {
        this.layers = [];
        this.layers.push(new Layer("Layer 0"));

        this.currentLayer = 0;
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