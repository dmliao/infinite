'use strict';

var Brush = require('../brush');

// randomized thickness pen
export default class Pen extends Brush {
    // rendering the actual brush    
    brush(layer, ctx, point, nextPoint, allPoints) {
        super.brush(layer, ctx, point, nextPoint, allPoints);
    }

    // set the thickness of the brush with a given base thickness to start with
    setThickness(base) {
        return base * Math.random() + 1;
    }

    setOpacity(base) {
        return base;
    }
}