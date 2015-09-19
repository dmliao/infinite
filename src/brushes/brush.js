'use strict';

export default class Brush {
    constructor() {

    }

    // rendering the actual brush
    brush(ctx, point, nextPoint) {
        stroke(0);
        strokeWeight(this.setThickness(point.thickness()));
        line(point.x(), point.y(), nextPoint.x(), nextPoint.y());
    }

    // set the thickness of the brush with a given base thickness to start with
    setThickness(base) {
        return base;
    }

    setOpacity(base) {
        return base;
    }
}