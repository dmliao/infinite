'use strict';

var Brush = require('../brush');

// a brush that draws onto the p5 canvas before being 'baked' onto the current layer
// TODO: IS TOTALLY BROKEN :'D
export default class P5Brush extends Brush {
    constructor() {
        super();
        this.current = createVector(0, 0);
        this.previous = createVector(0, 0);
        this.points = [];
    }
    brush(layer, ctx, point, nextPoint, allPoints) {
        // Grab mouse position      
        this.current.x = mouseX;
        this.current.y = mouseY;

        // New particle's force is based on mouse movement
        let force = p5.Vector.sub(this.current, this.previous);
        force.mult(0.05);

        this.points.push(new Particle({
            x: nextPoint.x,
            y: nextPoint.y
        }, force, this.setThickness(nextPoint.thickness())));

        // Store mouse values
        this.previous.x = this.current.x;
        this.previous.y = this.current.y;
    }

    update() {
        clear();
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].update();
            this.points[i].draw();
        }
    }

    release(layer, ctx, point) {
        this.previous = createVector(0, 0);
        this.current = createVector(0, 0);
    }
}

class Particle {
    constructor(position, force, thickness) {
        this.position = createVector(position.x, position.y);
        this.velocity = createVector(force.x, force.y);
        this.drag = 0.95;
        this.thickness = thickness;
    }

    update() {
        // Move it
        this.position.add(this.velocity);
        // Slow it down
        this.velocity.mult(this.drag);
    }

    draw(other) {
        stroke(this.thickness);
        ellipse(this.position.x, this.position.y, this.thickness, this.thickness);
        if (other) {
            line(this.position.x, this.position.y, other.position.x, other.position
                .y);
        }
    }
}