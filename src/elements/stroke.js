'use strict';

var Brush = require('../brushes/brush');

class StrokePoint {
    constructor(x, y, opts) {
        this.point = createVector(x, y);
        this.x = x;
        this.y = y;

        // opts is an object with the following fields: 
        /*
        {
            opacity: float,
            size: int,
            angle: int
        }
        */
        this.opts = opts || {};
    }

    getPoint() {
        return this.point;
    }

    thickness() {
        return this.opts.thickness || 1;
    }

    color() {
        return this.opts.color || '#000000';
    }

    toJSON() {
        let json = {
            x: this.point.x,
            y: this.point.y,
            opts: this.opts
        };
        return json;
    }

}

// a single brush stroke
export default class Stroke {
    // TODO: currently color needs to be a string. Allow it to be a number!
    constructor(brush, color, layer) {
        this.path = [];
        this.brush = brush || new Brush();
        this.color = color;
        this.layer = layer;
    }

    getLastPoint() {
        return this.path[this.path.length - 1];
    }

    addPoint(x, y, opts) {
        opts = opts || {};
        let strokePoint = new StrokePoint(x, y, opts);
        let ctx = this.layer.getContext();

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        // brush between the last point and this point only
        if (this.path.length >= 1) {
            this.brush.brush(this.layer, ctx, this.path[this.path.length -
                1], strokePoint, this.path);
        }
        else {
            this.brush.cap(this.layer, ctx, strokePoint);
        }

        this.path.push(strokePoint);
    }

    // draw the entire stroke with the provided canvas context
    // TODO: implement scale
    draw() {
        let ctx = this.layer.getContext();

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        this.brush.cap(this.layer, ctx, this.path[0]);

        for (let i = 0; i < this.path.length - 1; i++) {
            var point = this.path[i];
            var nextPoint = this.path[i + 1];

            this.brush.brush(this.layer, ctx, point, nextPoint, this.path);
        }

        this.brush.release(this.layer, ctx, this.path[this.path.length - 1]);

    }

    toJSON() {
        let json = {
            path: [],
            color: this.color
        };

        for (let i = 0; i < this.path.length; i++) {
            json.path.push(this.path[i].toJSON());
        }

        if (this.brush && this.brush.toJSON) {
            json.brush = this.brush.toJSON();
        }

        return json;
    }
}