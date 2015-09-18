'use strict';

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

}

// a single brush stroke
export default class Stroke {
    constructor(brush) {
        this.path = [];
        this.brush = brush;
    }

    addPoint(x, y, opts) {
        let strokePoint = new StrokePoint(x, y, opts);
        this.path.push(strokePoint);
    }

    // draw this stroke
    draw() {
        // TODO: implement brushes
        for (let i = 0; i < this.path.length - 1; i++) {
            var point = this.path[i];
            var nextPoint = this.path[i + 1];

            stroke(0);
            strokeWeight(point.thickness());
            line(point.x(), point.y(), nextPoint.x(), nextPoint.y());
        }

    }
}