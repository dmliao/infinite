'use strict';

var Brush = require('../brushes/brush');

class StrokePoint {
    constructor(x, y, opts) {
        this.point = createVector(x, y);

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

    x() {
        return this.point.x;
    }

    y() {
        return this.point.y;
    }

    thickness() {
        return this.opts.thickness || 1;
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
    constructor(brush) {
        this.path = [];
        this.brush = brush || new Brush();
    }

    addPoint(x, y, opts) {
        let strokePoint = new StrokePoint(x, y, opts);
        this.path.push(strokePoint);
    }

    // draw this stroke with the provided canvas context
    draw(ctx) {
        // TODO: implement brushes
        for (let i = 0; i < this.path.length - 1; i++) {
            var point = this.path[i];
            var nextPoint = this.path[i + 1];

            this.brush.brush(ctx, point, nextPoint);
        }

    }

    toJSON() {
        let json = {
            path: [],
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