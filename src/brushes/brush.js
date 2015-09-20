'use strict';

var ellipse = require('../polyfill/ellipse');

export default class Brush {
    constructor() {}

    shiftPoint(point, layer) {
        let artwork = layer.artwork;
        return {
            x: point.x + artwork.offsetX,
            y: point.y + artwork.offsetY
        }
    }

    // rendering the actual brush
    // allPoints is usually optional, but some brushes might want to mess
    // around with all points on the path
    brush(layer, ctx, point, nextPoint, allPoints) {

        ctx.lineWidth = this.setThickness(point.thickness());

        let shiftedPoint = this.shiftPoint(point, layer);
        let shiftedNext = this.shiftPoint(nextPoint, layer);

        ctx.beginPath();
        ctx.moveTo(shiftedPoint.x, shiftedPoint.y);
        ctx.lineTo(shiftedNext.x, shiftedNext.y);
        ctx.stroke();
    }

    // rendering the caps
    cap(layer, ctx, point) {

        var actualThickness = this.setThickness(point.thickness());

        let shiftedPoint = this.shiftPoint(point, layer);

        ctx.beginPath();
        ellipse(ctx, shiftedPoint.x, shiftedPoint.y, actualThickness,
            actualThickness,
            0, 0, Math.PI * 2);
        ctx.fill();
    }

    // called when the brush is lifted from the paper
    release(layer, ctx, point) {
        this.cap(layer, ctx, point);
    }

    // set the thickness of the brush with a given base thickness to start with
    setThickness(base) {
        return base;
    }

    setOpacity(base) {
        return base;
    }
}